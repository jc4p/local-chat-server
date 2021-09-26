const bcrypt = require('bcryptjs')
const utils = require('./utils')
const res = utils.returnJson

const create = async (event) => {
  const { username, password } = JSON.parse(event.body);
  if (!username || !password) { return res({ error: 'Invalid arguments' }) }

  const hashed = await bcrypt.hash(password, 10);

  const newUser = {
    username: username,
    password: hashed
  }

  const token = utils.generateToken(username)

  return res({
    message: 'Going to create the following user and return this auth token',
    newUser: newUser,
    token: token
  })
}

module.exports = {
  create
}