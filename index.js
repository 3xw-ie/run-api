require('./bootstrap')
const restServer = require('./rest/server')

restServer.listen(process.env.PORT || 4001)
console.log('REST Server running on http://localhost:4001')
