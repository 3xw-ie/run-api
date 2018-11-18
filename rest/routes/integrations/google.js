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
  returnJson(res, tokens)
}))

router.use('*', asyncHandler(async (req, res, next) => {
  const token = await getAccessToken(req.headers.authorization, 'googleRefresh')
  if (!token) {
    return res.status(500).send('Could not get Google Access Token.')
  }
  OAuth2Client.setCredentials({
    refresh_token: token
  })
  res.locals.auth = OAuth2Client
  next()
}))

router.use('/analytics', asyncHandler(async (req, res, next) => {
  res.locals.analyticsreporting = google.analyticsreporting({
    version: 'v4',
    auth: res.locals.auth
  })
  next()
}))

router.post('/analytics/batchGet', (req, res) => {
  res.locals.analyticsreporting.reports.batchGet({
    requestBody: {
      reportRequests: [
        {
          viewId: req.body.viewId,
          dateRanges: [
            {
              startDate: req.body.range.startDate,
              endDate: req.body.range.endDate
            }
          ],
          metrics: [
            {
              expression: req.body.expression
            }
          ]
        }
      ]
    }
  })
    .then(data => returnJson(res, data.data))
    .catch(error => returnJsonError(res, error.response.data, error.response.status))
})

module.exports = router
