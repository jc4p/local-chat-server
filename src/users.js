const bcrypt = require('bcryptjs')
const utils = require('./utils')
const res = utils.returnJson

const create = async (event) => {
  const { username, password } = JSON.parse(event.body)
  if (!username || !password) { return res({ error: 'Invalid arguments' }) }

  const hashed = await bcrypt.hash(password, 10);

  const db = await utils.getDatabase()
  let user
  try {
    user = await db.query({
      text: 'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
      values: [username, hashed]
    })
  }
  catch (err) {
    if (err.detail.indexOf('already exists') > -1) {
      return res({ error: 'User already exists' })
    }
    return res({ error: "Couldn't create user" })
  }

  const token = utils.generateToken(user.rows[0].id, username)

  return res({
    token: token
  })
}

const login = async (event) => {
  const { username, password } = JSON.parse(event.body)
  if (!username || !password) { return res({ error: 'Invalid arguments' }) }

  const db = await utils.getDatabase()

  const user = await db.query({
    text: 'SELECT * FROM users WHERE username = $1',
    values: [username]
  })

  if (user.rows.length === 0) {
    return res({ error: 'No such user' })
  }

  const correctInput = await bcrypt.compare(password, user.rows[0].password)

  if (!correctInput) {
    return res({ error: 'Invalid password'})
  }

  const userRow = user.rows[0]

  const token = utils.generateToken(userRow.id, userRow.username)

  return res({
    token: token
  })
}

module.exports = {
  create,
  login
}