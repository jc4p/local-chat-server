const utils = require('./utils')
const res = utils.returnJson

const send = async (event) => {
  const token = utils.verifyAuthHeader(event.headers)
  if (!token) { return res({ error: 'Invalid user' }) }

  const { chat_id, message} = JSON.parse(event.body);
  if (!chat_id || !message) { return res({ error: 'Invalid arguments' }) }

  const db = await utils.getDatabase()
  const chatExists = await db.query({
    text: 'SELECT 1 FROM chats WHERE chat_uid = $1',
    values: [chat_id]
  })

  if (chatExists.rows.length === 0) {
    return res({ error: `No such chat: ${chat_id}` })
  }

  try {
   db.query({
     text: 'INSERT INTO messages (chat_uid, message, sender) VALUES ($1, $2, $3)',
     values: [chat_id, message, token.id]
   })
  } catch(err) {
    return res({ error: "Couldn't send message" })
  }

  return res({ status: 'OK' })
}

module.exports = {
  send
}