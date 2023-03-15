const { UserList } = require('../FakeData');
const resolvers = {
  Query: {
    users: () => {
      return UserList;
    },
  },

  Mutation: {
    createUser: async (parent, args) => {
      const { username, email, password } = args.input;
    },
  },
};

module.exports = resolvers;
