const jwt = require('jsonwebtoken')
const pg = require('pg')

const getDatabase = async () => {
  client = new pg.Client({
    host: process.env.APP_DB_HOST,
    user: process.env.APP_DB_USER,
    database: process.env.APP_DB_NAME,
    password: process.env.APP_DB_PASSWORD
  })
  // i think if the same instance of a deployed function gets called multiple times this might try to re-connect
  await client.connect()
  return client
}

const returnJson = (payload, statusCode) => {
  return {
    statusCode: statusCode || 200,
    body: JSON.stringify(payload)
  }
}

const verifyAuthHeader = (headers) => {
  if (!headers.hasOwnProperty('Authorization')) { return false }

  const auth = headers.Authorization
  if (!auth.indexOf('Bearer ') === 0) { return false }

  return verifyToken(auth.split('Bearer ')[1])
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
  verifyAuthHeader,
  returnJson
}