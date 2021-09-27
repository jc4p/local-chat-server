const wss = require('ws')
const utils = require('./utils')
const res = utils.returnJson

const webSocketToken = utils.generateToken(-1, 'message_forward', '30d', 'server')

const ws = new wss(process.env.WEBSOCKET_URI)
ws.on('open', () => {
  ws.send(JSON.stringify({
    auth: webSocketToken
  }))
})

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
   forwardToWebSockets(chat_id, message, token.username)
  } catch(err) {
    return res({ error: "Couldn't send message" })
  }

  return res({ status: 'OK' })
}

const forwardToWebSockets = async (chat_id, message, sender) => {
  try {
    ws.send(JSON.stringify({
      chat_id: chat_id,
      message: message,
      sender: sender.username
    }))
  } catch(err) {
    console.log('error sending message to websocket server')
  }
}

module.exports = {
  send
}