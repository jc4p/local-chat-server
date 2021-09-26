const jwt = require('jsonwebtoken')

const getDatabase = () => {
  return null
}

const returnJson = (payload) => {
  return {
    statusCode: 200,
    body: JSON.stringify(payload)
  }
}

const generateToken = (username, expiration) => {
  return jwt.sign(
    {
      id: username
    },
    process.env.JWT_SECRET,
    {
      expiresIn: expiration || '30d'
    }
  )
}

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET)
  }
  catch (err) {
    return false
  }
}

const refreshToken = (token) => {
  // #TODO verify token and renew it
  return token
}

module.exports = {
  getDatabase,
  generateToken,
  verifyToken,
  returnJson
}