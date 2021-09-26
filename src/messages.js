const utils = require('./utils')
const res = utils.returnJson

const send = async (event) => {
  return res({ message: 'OK' })
}

module.exports = {
  send
}