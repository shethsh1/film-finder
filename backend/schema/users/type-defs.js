const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
  }

  type Query {
    users: [User!]!
  }

  input CreateUserInput {
    username: String!
    email: String!
    password: String!
  }

  type Mutation {
    createUser(input: CreateUserInput!): [User]!
  }
`;

module.exports = typeDefs;
