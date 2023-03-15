const { UserList } = require('../FakeData');
const knex = require('../../db/knex');
const resolvers = {
  Query: {
    users: () => {
      return UserList;
    },
  },

  Mutation: {
    createUser: async (parent, args) => {
      // const { username, email, password } = args.input;
      const users = knex('users');
      const test = await users.select('*');
      return test;
      // return test;
    },
  },
};

module.exports = resolvers;
