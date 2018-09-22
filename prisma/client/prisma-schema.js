module.exports = {
        typeDefs: /* GraphQL */ `type AggregateSegment {
  count: Int!
}

type BatchPayload {
  count: Long!
}

scalar DateTime

scalar Long

type Mutation {
  createSegment(data: SegmentCreateInput!): Segment!
  updateSegment(data: SegmentUpdateInput!, where: SegmentWhereUniqueInput!): Segment
  updateManySegments(data: SegmentUpdateInput!, where: SegmentWhereInput): BatchPayload!
  upsertSegment(where: SegmentWhereUniqueInput!, create: SegmentCreateInput!, update: SegmentUpdateInput!): Segment!
  deleteSegment(where: SegmentWhereUniqueInput!): Segment
  deleteManySegments(where: SegmentWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Query {
  segment(where: SegmentWhereUniqueInput!): Segment
  segments(where: SegmentWhereInput, orderBy: SegmentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Segment]!
  segmentsConnection(where: SegmentWhereInput, orderBy: SegmentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): SegmentConnection!
  node(id: ID!): Node
}

type Segment {
  id: ID!
  name: String!
  videoId: String!
  startTime: Int!
  endTime: Int!
  mastery: Int
  category: String
  tags: [String!]!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type SegmentConnection {
  pageInfo: PageInfo!
  edges: [SegmentEdge]!
  aggregate: AggregateSegment!
}

input SegmentCreateInput {
  name: String!
  videoId: String!
  startTime: Int!
  endTime: Int!
  mastery: Int
  category: String
  tags: SegmentCreatetagsInput
}

input SegmentCreatetagsInput {
  set: [String!]
}

type SegmentEdge {
  node: Segment!
  cursor: String!
}

enum SegmentOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  videoId_ASC
  videoId_DESC
  startTime_ASC
  startTime_DESC
  endTime_ASC
  endTime_DESC
  mastery_ASC
  mastery_DESC
  category_ASC
  category_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type SegmentPreviousValues {
  id: ID!
  name: String!
  videoId: String!
  startTime: Int!
  endTime: Int!
  mastery: Int
  category: String
  tags: [String!]!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type SegmentSubscriptionPayload {
  mutation: MutationType!
  node: Segment
  updatedFields: [String!]
  previousValues: SegmentPreviousValues
}

input SegmentSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: SegmentWhereInput
  AND: [SegmentSubscriptionWhereInput!]
  OR: [SegmentSubscriptionWhereInput!]
  NOT: [SegmentSubscriptionWhereInput!]
}

input SegmentUpdateInput {
  name: String
  videoId: String
  startTime: Int
  endTime: Int
  mastery: Int
  category: String
  tags: SegmentUpdatetagsInput
}

input SegmentUpdatetagsInput {
  set: [String!]
}

input SegmentWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  videoId: String
  videoId_not: String
  videoId_in: [String!]
  videoId_not_in: [String!]
  videoId_lt: String
  videoId_lte: String
  videoId_gt: String
  videoId_gte: String
  videoId_contains: String
  videoId_not_contains: String
  videoId_starts_with: String
  videoId_not_starts_with: String
  videoId_ends_with: String
  videoId_not_ends_with: String
  startTime: Int
  startTime_not: Int
  startTime_in: [Int!]
  startTime_not_in: [Int!]
  startTime_lt: Int
  startTime_lte: Int
  startTime_gt: Int
  startTime_gte: Int
  endTime: Int
  endTime_not: Int
  endTime_in: [Int!]
  endTime_not_in: [Int!]
  endTime_lt: Int
  endTime_lte: Int
  endTime_gt: Int
  endTime_gte: Int
  mastery: Int
  mastery_not: Int
  mastery_in: [Int!]
  mastery_not_in: [Int!]
  mastery_lt: Int
  mastery_lte: Int
  mastery_gt: Int
  mastery_gte: Int
  category: String
  category_not: String
  category_in: [String!]
  category_not_in: [String!]
  category_lt: String
  category_lte: String
  category_gt: String
  category_gte: String
  category_contains: String
  category_not_contains: String
  category_starts_with: String
  category_not_starts_with: String
  category_ends_with: String
  category_not_ends_with: String
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  AND: [SegmentWhereInput!]
  OR: [SegmentWhereInput!]
  NOT: [SegmentWhereInput!]
}

input SegmentWhereUniqueInput {
  id: ID
}

type Subscription {
  segment(where: SegmentSubscriptionWhereInput): SegmentSubscriptionPayload
}
`
      }
    