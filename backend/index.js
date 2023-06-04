const { ApolloServer } = require('apollo-server');
const userTypeDefs = require('./schema/users/type-defs');
const userResolvers = require('./schema/users/resolvers');
require('dotenv').config();
const context = ({ req }) => {
  return {
    req,
  };
};
const server = new ApolloServer({
  typeDefs: [userTypeDefs],
  resolvers: [userResolvers],
  context,
  persistedQueries: false, // Disable persistent queries
});

server
  .listen({ port: process.env.PORT || 4000, host: '0.0.0.0' })
  .then(({ url }) => {
    console.log(`Your API is running at ${url}`);
  });
