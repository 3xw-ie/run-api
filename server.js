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

app.use((req, res, next) => {
  console.log(`${req.method.toUpperCase()} ${req.url} STATUS: ${res.statusCode}`)
  next()
})

app.use(bodyParser.json())

const router = express.Router()

router.use('/intercom/:token', (req, res, next) => {
  res.locals.intercom = new Intercom.Client({
    token: req.params.token
  })
  next()
})

router.get('/', (req, res) => {
  return res.send('Working.')
})

router.get('/intercom/:token/users', (req, res) => {
  res.locals.intercom.users.list(response => {
    return res.json(response.body)
  })
})
router.get('/intercom/:token/contacts', (req, res) => {
  const q = req.query
  if (q.email) {
    res.locals.intercom.leads.listBy({ email: true }, response => {
      return res.json(response.body)
    })
  }
  res.locals.intercom.leads.list(response => {
    return res.json(response.body)
  })
})

router.get('/intercom/:token/admins', (req, res) => {
  res.locals.intercom.admins.list(response => {
    return res.json(response.body)
  })
})

router.get('/intercom/:token/counts', (req, res) => {
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

app.use('/rest', router)

app.listen(process.env.PORT || 4001)
console.log('Express Server is running on http://localhost:4001')

const { prisma } = require('./generated/prisma-client')
const { GraphQLServer } = require('graphql-yoga')

const resolvers = {
  Query: {
    allContacts(root, args, context) {
      return context.prisma.contacts()
    }
  },
  Mutation: {
    createContact(root, args, context) {
      return context.prisma.createContact({ ...args })
    }
  }
}

const server = new GraphQLServer({
  typeDefs: './graphql/schema.graphql',
  resolvers,
  context: {
    prisma
  }
})

server.start(() => console.log('GraphQL Server is running on http://localhost:4000'))