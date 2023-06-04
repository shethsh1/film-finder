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

server.listen().then(({ url }) => {
  console.log('Your API is running :' + url);
});
