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

    googleLogin: async (parent, { input }) => {
      const { error, value } = UserSchema.userGoogleLoginSchema.validate(input);
      if (error) {
        throw new Error(error.message);
      }
      const { credentials } = value;

      const { email, firstName, lastName } =
        await UserService.verifyGoogleCredentials(credentials);

      const userExists = await UserService.getUserByEmail(email);

      if (!userExists) {
        const randomNum = Math.floor(Math.random() * 9000) + 1000;
        const formattedUsername = `${firstName}_${lastName}_${randomNum}`;
        const userCreated = await UserService.createGoogleUser({
          username: formattedUsername,
          email,
        });
        if (!userCreated) {
          throw new Error("Something went wrong...");
        }
      }

      const isGoogleUser = await UserService.checkIfGoogleUser(email);
      if (!isGoogleUser) {
        throw new Error("This account was created without google login");
      }

      const jwt = HelperService.createToken({
        email: isGoogleUser.email,
        userId: isGoogleUser.id,
        username: isGoogleUser.username,
        expiredTime: "1d",
      });
      return { jwt };
    },
  },
};

module.exports = resolvers;
