const { gql } = require("apollo-server");

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

  # Google Login Input
  input GoogleLoginInput {
    credentials: String!
  }
  # Google Login Input Ends

  type Mutation {
    createUser(input: CreateUserInput!): createUserResult!
    login(input: LoginInput!): LoginResult!
    googleLogin(input: GoogleLoginInput!): LoginResult!
  }
`;

module.exports = typeDefs;
