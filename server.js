const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const Intercom = require('intercom-client')

app.options('/*', function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
  res.send(200)
})

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.use(bodyParser.json())

app.use('/intercom/:token', (req, res, next) => {
  try {
    res.locals.intercom = new Intercom.Client({
      token: req.params.token
    })
  } catch (error) {
    console.error(error)
    return res.json(error)
  }
  next()
})

app.get('/', (req, res) => {
  return res.send('Working.')
})

app.get('/intercom/:token/users', (req, res) => {
  res.locals.intercom.users.list(response => {
    return res.json(response.body)
  })
})

app.get('/intercom/:token/admins', (req, res) => {
  res.locals.intercom.admins.list(response => {
    return res.json(response.body)
  })
})

app.get('/intercom/:token/counts', (req, res) => {
  const q = req.query
  if (q.type === 'user' && q.count === 'segment') {
    res.locals.intercom.counts.userSegmentCounts(response => {
      return res.json(response.body)
    })
  } else {
    res.locals.intercom.counts.appCounts(response => {
      return res.json(response.body)
    })
  }
})

app.listen(process.env.PORT || 3001)
