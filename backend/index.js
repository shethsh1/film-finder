const { ApolloServer } = require('apollo-server');
const userTypeDefs = require('./schema/users/type-defs');
const userResolvers = require('./schema/users/resolvers');

const server = new ApolloServer({
  typeDefs: [userTypeDefs],
  resolvers: [userResolvers],
});

server.listen().then(({ url }) => {
  console.log('Your API is running :' + url);
});
