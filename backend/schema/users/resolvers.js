const UserSchema = require("./userSchema");
const UserService = require("../../services/UserService");
const HelperService = require("../../services/HelperService");
const { auth } = require("../../middleware/auth");
const resolvers = {
  Query: {
    users: async () => {
      return await UserService.getAllUsers();
    },

    checkJwt: async (_, args, { req }) => {
      auth(req);
      return true;
    },
  },

  Mutation: {
    login: async (parent, { input }) => {
      const { error, value } = UserSchema.userLoginSchema.validate(input);
      if (error) {
        throw new Error(error.message);
      }

      const { email, password } = value;
      const userLoginCheck = await UserService.verifyCredentials(
        email,
        password
      );
      if (!userLoginCheck) {
        throw new Error("invalid email or password");
      }

      const jwt = HelperService.createToken({
        email: userLoginCheck.email,
        userId: userLoginCheck.id,
        username: userLoginCheck.username,
        expiredTime: "1d",
      });
      return { jwt };
    },

    createUser: async (parent, { input }) => {
      const { error, value } = UserSchema.userInputSchema.validate(input);
      if (error) {
        throw new Error(error.message);
      }
      const { username, email, password } = value;
      const result = await UserService.getUserByEmail(email);
      if (result) {
        throw new Error("User already exists");
      }

      const createResult = await UserService.createUser({
        username,
        email,
        password,
      });
      return createResult;
    },
  },
};

module.exports = resolvers;
