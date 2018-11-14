const express = require('express')
const router = express.Router()
const asyncHandler = require('express-async-handler')
const { returnJson, getAccessToken } = require('~/helpers')
const Intercom = require('intercom-client')

router.use('*', asyncHandler(async (req, res, next) => {
  res.locals.intercom = new Intercom.Client({
    token: await getAccessToken(req.headers.authorization, 'intercom')
  })
  next()
}))

router.get('/users', (req, res) => {
  res.locals.intercom.users.list(data => returnJson(res, data.body))
})

router.get('/contacts', (req, res) => {
  if (req.query.email) {
    res.locals.intercom.leads.listBy({ email: true }, data => {
      return res.json(res, data.body)
    })
  }
  res.locals.intercom.leads.list(data => returnJson(res, data.body))
})

router.get('/admins', (req, res) => {
  res.locals.intercom.admins.list(data => returnJson(res, data.body))
})

router.get('/counts', (req, res) => {
  if (req.query.type === 'user' && req.query.count === 'segment') {
    res.locals.intercom.counts.userSegmentCounts(data =>
      returnJson(res, data.body)
    )
  } else {
    res.locals.intercom.counts.appCounts(data =>
      returnJson(res, data.body)
    )
  }
})

module.exports = router