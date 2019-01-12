if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const { prisma } = require('./prisma/client');
const { ApolloServer, gql } = require('apollo-server');
const { importSchema } = require('graphql-import');

// With Prisma Client Beta 1.17,
// The generated Prisma Client v1.17 does not return relationship data by default, only scalar data.
// In order to query relationships, use the $fragment method

// This seems verbose. Follow along in this issue:
//   https://github.com/prisma/prisma/issues/3104

const resolvers = {
    Query: {
        async segments(root, args, context) {
            return context.prisma.segments();
        },
        async session(root, args, context) {
            return context.prisma.session({ id: args.id });
        },
    },
    Mutation: {
        async createSegment(root, args, context) {
            return context.prisma.createSegment(args.data);
        },
        async createSession(root, args, context) {
            return context.prisma.createSession(args.data);
        },
    },
};

const server = new ApolloServer({
    typeDefs: gql(importSchema('./schema.graphql')),
    resolvers,
    context: {
        prisma,
    },
    introspection: true,
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
    console.log(`🚀  Prisma ready at ${process.env.PRISMA_ENDPOINT}`);
});
