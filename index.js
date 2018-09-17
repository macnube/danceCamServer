if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const fs = require('fs')
const { prisma } = require('./prisma/client')
const { ApolloServer, gql } = require('apollo-server');

// With Prisma Client Beta 1.17,
// The generated Prisma Client v1.17 does not return relationship data by default, only scalar data.
// In order to query relationships, we must use the $fragment method

// This seems unnecessarily verbose, because Prisma already understand this relationship
// I've asked this question in the following issue:
//   https://github.com/prisma/prisma/issues/3104

const SessionWithSegmentRelationFragment = `
  fragment SessionWithSegmentRelation on Session {
    id
    name
    description
    createdAt
    updatedAt
    segments {
      id
      name
      videoId
      startTime
      endTime
      createdAt
      updatedAt
    }
  }
`

const resolvers = {
  Query: {
    async session(root, args, context) {
      return context.prisma.session({ id: args.id }).$fragment(SessionWithSegmentRelationFragment);
    },
  },
  Mutation: {
    async createSession(root, args, context) {
      return context.prisma.createSession(args.data).$fragment(SessionWithSegmentRelationFragment)
    },
  },
}

const server = new ApolloServer({
  typeDefs: gql(fs.readFileSync('./schema.graphql', 'utf8')),
  resolvers,
  context: { 
    prisma
  },
  introspection: true
})


server.listen({ port: process.env.PORT || 4000 })
  .then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
    console.log(`🚀  Prisma ready at ${process.env.PRISMA_ENDPOINT}`);
  })
