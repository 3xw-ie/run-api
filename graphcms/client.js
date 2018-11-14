const { GraphQLClient } = require('graphql-request')

const client = new GraphQLClient(process.env.GRAPHCMS_ENDPOINT, {
  headers: {
    Authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`
  }
})

module.exports = client