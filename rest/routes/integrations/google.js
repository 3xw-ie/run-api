const express = require('express')
const router = express.Router()
const asyncHandler = require('express-async-handler')
const { returnJson, returnJsonError, getAccessToken } = require('~/helpers')
const { google } = require('googleapis')

const scopes = 'https://www.googleapis.com/auth/analytics.readonly'

const OAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
)

router.get('/oauth/url', (req, res) => {
  const url = OAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes
  })
  res.send(url)
})

/* Authenticate with OAuth2 */
router.post('/oauth/authenticate', asyncHandler(async (req, res) => {
  const { tokens } = await OAuth2Client.getToken(req.body.code)
    .catch(error => returnJsonError(res, error.response.data, error.response.status))
  console.log(tokens)
  returnJson(res, tokens)
}))

module.exports = router
