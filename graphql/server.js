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