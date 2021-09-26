const nanoid = require('nanoid').nanoid
const utils = require('./utils')
const res = utils.returnJson

const create = async (event) => {
  const auth = event.headers.Authorization
  const jwt = auth.split('Bearer ')[1]

  const token = utils.verifyToken(jwt)

  if (!token) {
    return res({ error: 'Invalid user' })
  }

  const { name, description } = JSON.parse(event.body);
  if (!name || !description) { return res({ error: 'Invalid arguments' }) }

  const chatId = nanoid(12)

  const newChat = {
    name: name,
    description: description,
    chatId: chatId,
    createdBy: token.id
  }

  return res({
    message: 'Going to create the following chat',
    newChat: newChat
  })
}

module.exports = {
  create
}