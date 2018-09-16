const { prisma } = require('./prisma-client')
const { GraphQLServer } = require('graphql-yoga')

const resolvers = {
  Query: {
    async session(root, args, context) {
      return context.prisma.sessions({ where: { id: args.id } })
    },
  },
  Mutation: {
    // As of 2016-09-16, there is some unexpected behavior 
    // when nesting object writes through Prisma's Javascript client
    // 
    // The expected behavior is that prisma.createSession will resolve
    // with any nested objects that were writen in the mutation.
    //
    // The actual behavior is that nested objects return as null.
    //
    // For example, consider the following mutation
    //
    // mutation CreateSession($data:SessionCreateInput!){
    //   createSession(data:$data){
    //     id
    //     name
    //     description
    //     createdAt
    //     updatedAt
    //     segments{
    //       id
    //       name
    //     }
    //   }
    // }
    // 
    // {
    //   "data": {
    //     "name": "Test Session",
    //     "description": "Test Description",
    //     "segments": {
    //       "create":[
    //         {
    //           "name":"Test segment",
    //           "videoId":"1234",
    //           "startTime":12,
    //           "endTime":15
    //         }
    //       ]
    //     }
    //   }
    // }
    // 
    // When passed directly to Prisma's GraphQL playground,
    // we receive the following response:
    // 
    // {
    //   "data": {
    //     "createSession": {
    //       "name": "Test Session",
    //       "updatedAt": "2018-09-16T12:26:54.591Z",
    //       "description": "Test Description",
    //       "id": "cjm4u4z5g00bz07759rjagipi",
    //       "segments": [
    //         {
    //           "id": "cjm4u4z5v00c00775pdp6sf4u",
    //           "name": "Test segment"
    //         }
    //       ],
    //       "createdAt": "2018-09-16T12:26:54.591Z"
    //     }
    //   }
    // }
    // 
    // However, when the same data is passed through createSession,
    // we receive this response:
    // 
    // {
    //   "data": {
    //     "createSession": {
    //       "id": "cjm4u6eqy00c40775fjlvorm3",
    //       "name": "Test Session",
    //       "description": "Test Description",
    //       "createdAt": "2018-09-16T12:28:01.453Z",
    //       "updatedAt": "2018-09-16T12:28:01.453Z",
    //       "segments": null
    //     }
    //   }
    // }
    //
    // Until this is addressed in Prisma, do not expect nested 
    // inside of the mutation's response

    async createSession(root, args, context) {
      return context.prisma.createSession(args.data);
    },
  },
}

const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers,
  context: { 
    prisma
  },
})


server.start(() => console.log('Server is running on http://localhost:4000'))