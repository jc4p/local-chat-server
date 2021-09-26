const nanoid = require('nanoid').nanoid
const utils = require('./utils')
const res = utils.returnJson

const create = async (event) => {
  const token = utils.verifyAuthHeader(event.headers)
  if (!token) { return res({ error: 'Invalid user' }) }

  const { name, description } = JSON.parse(event.body);
  if (!name || !description) { return res({ error: 'Invalid arguments' }) }

  const chatId = nanoid(12)

  const db = await utils.getDatabase()
  try {
    await db.query({
      text: 'INSERT INTO chats (chat_uid, name, description) VALUES ($1, $2, $3)',
      values: [chatId, name, description]
    })
    await db.query({
      text: 'INSERT INTO chat_users (chat_uid, user_id, role) VALUES ($1, $2, $3)',
      values: [chatId, token.id, 'creator']
    })
  } catch(err) {
    console.log(err)
    return res({ error: "Couldn't create chat" })
  }

  return res({
    chat: {
      id: chatId,
      creator: token.name,
      users: [token.name]
    }
  })
}

module.exports = {
  create
}