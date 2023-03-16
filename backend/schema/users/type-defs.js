const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
  }

  type Query {
    users: [User!]!
    checkJwt: Boolean!
  }

  # Create User inputs
  input CreateUserInput {
    username: String!
    email: String!
    password: String!
  }

  type createUserResult {
    id: ID!
  }
  # Create User inputs Ends

  # Login inputs
  input LoginInput {
    email: String!
    password: String!
  }

  type LoginResult {
    jwt: String!
  }
  # Login inputs Ends

  type Mutation {
    createUser(input: CreateUserInput!): createUserResult!
    login(input: LoginInput!): LoginResult!
  }
`;

module.exports = typeDefs;
