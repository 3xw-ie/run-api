const GraphCMS = require('~/graphcms/client')

const returnJson = (res, data) => { return res.json(data) }
const returnJsonError = (res, error, statusCode = error.statusCode) => { return res.status(statusCode).json(error) }

const getBearerToken = token => {
  if (token.startsWith('Bearer ')) {
    return token.slice(7, token.length).trimLeft()
  }
  console.error(`Invalid Bearer token provided. Token: ${token}`)
}

const getAccessToken = async (auth, service) => {
  if (!auth) return console.error('Authorization not provided.')
  if (!service) return console.error('Service not provided.')
  const query = `
  query($id: ID!) {
    account(
      where: {
        id: $id
      }
    ) {
      ${service}Token
    }
  }
  `
  return await GraphCMS.request(query, {
    id: getBearerToken(auth)
  })
    .then(response => {
      if (!response.account) throw `Account not found with id: ${getBearerToken(auth)}`
      return response.account[`${service}Token`]
    })
    .catch(error => {
      console.error(error)
    })
}

module.exports = {
  returnJson,
  returnJsonError,
  getBearerToken,
  getAccessToken
}