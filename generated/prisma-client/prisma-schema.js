module.exports = {
        typeDefs: /* GraphQL */ `type AggregateContact {
  count: Int!
}

type BatchPayload {
  count: Long!
}

type Contact {
  id: ID!
  email: String
  name: String
  shortname: String
  type: ContactType
  category: String
  hubspot_id: String
  intercom_id: String
  stripe_id: String
}

type ContactConnection {
  pageInfo: PageInfo!
  edges: [ContactEdge]!
  aggregate: AggregateContact!
}

input ContactCreateInput {
  email: String
  name: String
  shortname: String
  type: ContactType
  category: String
  hubspot_id: String
  intercom_id: String
  stripe_id: String
}

type ContactEdge {
  node: Contact!
  cursor: String!
}

enum ContactOrderByInput {
  id_ASC
  id_DESC
  email_ASC
  email_DESC
  name_ASC
  name_DESC
  shortname_ASC
  shortname_DESC
  type_ASC
  type_DESC
  category_ASC
  category_DESC
  hubspot_id_ASC
  hubspot_id_DESC
  intercom_id_ASC
  intercom_id_DESC
  stripe_id_ASC
  stripe_id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type ContactPreviousValues {
  id: ID!
  email: String
  name: String
  shortname: String
  type: ContactType
  category: String
  hubspot_id: String
  intercom_id: String
  stripe_id: String
}

type ContactSubscriptionPayload {
  mutation: MutationType!
  node: Contact
  updatedFields: [String!]
  previousValues: ContactPreviousValues
}

input ContactSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ContactWhereInput
  AND: [ContactSubscriptionWhereInput!]
  OR: [ContactSubscriptionWhereInput!]
  NOT: [ContactSubscriptionWhereInput!]
}

enum ContactType {
  Lead
  User
}

input ContactUpdateInput {
  email: String
  name: String
  shortname: String
  type: ContactType
  category: String
  hubspot_id: String
  intercom_id: String
  stripe_id: String
}

input ContactWhereInput {
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
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
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
  shortname: String
  shortname_not: String
  shortname_in: [String!]
  shortname_not_in: [String!]
  shortname_lt: String
  shortname_lte: String
  shortname_gt: String
  shortname_gte: String
  shortname_contains: String
  shortname_not_contains: String
  shortname_starts_with: String
  shortname_not_starts_with: String
  shortname_ends_with: String
  shortname_not_ends_with: String
  type: ContactType
  type_not: ContactType
  type_in: [ContactType!]
  type_not_in: [ContactType!]
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
  hubspot_id: String
  hubspot_id_not: String
  hubspot_id_in: [String!]
  hubspot_id_not_in: [String!]
  hubspot_id_lt: String
  hubspot_id_lte: String
  hubspot_id_gt: String
  hubspot_id_gte: String
  hubspot_id_contains: String
  hubspot_id_not_contains: String
  hubspot_id_starts_with: String
  hubspot_id_not_starts_with: String
  hubspot_id_ends_with: String
  hubspot_id_not_ends_with: String
  intercom_id: String
  intercom_id_not: String
  intercom_id_in: [String!]
  intercom_id_not_in: [String!]
  intercom_id_lt: String
  intercom_id_lte: String
  intercom_id_gt: String
  intercom_id_gte: String
  intercom_id_contains: String
  intercom_id_not_contains: String
  intercom_id_starts_with: String
  intercom_id_not_starts_with: String
  intercom_id_ends_with: String
  intercom_id_not_ends_with: String
  stripe_id: String
  stripe_id_not: String
  stripe_id_in: [String!]
  stripe_id_not_in: [String!]
  stripe_id_lt: String
  stripe_id_lte: String
  stripe_id_gt: String
  stripe_id_gte: String
  stripe_id_contains: String
  stripe_id_not_contains: String
  stripe_id_starts_with: String
  stripe_id_not_starts_with: String
  stripe_id_ends_with: String
  stripe_id_not_ends_with: String
  AND: [ContactWhereInput!]
  OR: [ContactWhereInput!]
  NOT: [ContactWhereInput!]
}

input ContactWhereUniqueInput {
  id: ID
  email: String
}

scalar Long

type Mutation {
  createContact(data: ContactCreateInput!): Contact!
  updateContact(data: ContactUpdateInput!, where: ContactWhereUniqueInput!): Contact
  updateManyContacts(data: ContactUpdateInput!, where: ContactWhereInput): BatchPayload!
  upsertContact(where: ContactWhereUniqueInput!, create: ContactCreateInput!, update: ContactUpdateInput!): Contact!
  deleteContact(where: ContactWhereUniqueInput!): Contact
  deleteManyContacts(where: ContactWhereInput): BatchPayload!
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
  contact(where: ContactWhereUniqueInput!): Contact
  contacts(where: ContactWhereInput, orderBy: ContactOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Contact]!
  contactsConnection(where: ContactWhereInput, orderBy: ContactOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ContactConnection!
  node(id: ID!): Node
}

type Subscription {
  contact(where: ContactSubscriptionWhereInput): ContactSubscriptionPayload
}
`
      }
    