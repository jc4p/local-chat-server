const utils = require('./utils')
const res = utils.returnJson

const send = async (event) => {
  const token = utils.verifyAuthHeader(event.headers)

  if (!token) {
    return res({ error: 'Invalid user' })
  }

  const { chat_id, message, username } = JSON.parse(event.body);
  if (!chat_id || !message || !username) { return res({ error: 'Invalid arguments' }) }

  const db = await utils.getDatabase()
  const chatExists = await db.query({
    text: 'SELECT 1 FROM chats WHERE chat_uid = $1',
    values: [chat_id]
  })

  if (chatExists.rows.length === 0) {
    return res({ error: `No such chat: ${chat_id}` })
  }

  return res({ message: 'OK' })
}

module.exports = {
  send
}