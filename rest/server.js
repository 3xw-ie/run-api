const express = require('express')
const server = express()
const bodyParser = require('body-parser')

server.options('/*', function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
  res.sendStatus(200)
})

server.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

server.use((req, res, next) => {
  console.log(`${req.method.toUpperCase()} ${req.url}`)
  next()
})

server.use(bodyParser.json())

const router = express.Router()

const google = require('~/rest/routes/integrations/google')
router.use('/google', google)

const intercom = require('~/rest/routes/integrations/intercom')
router.use('/intercom', intercom)

const stripe = require('~/rest/routes/integrations/stripe')
router.use('/stripe', stripe)

server.use('/rest', router)

module.exports = server