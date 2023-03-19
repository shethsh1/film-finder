const knex = require("../db/knex");
const bcrypt = require("bcrypt");
const { OAuth2Client } = require("google-auth-library");

const WEB_GOOGLE_CLIENT_ID = process.env.WEB_GOOGLE_CLIENT_ID;
const client = new OAuth2Client(WEB_GOOGLE_CLIENT_ID);

const getUserByEmail = async (email) => {
  const users = knex("users");
  const [result] = await users.select("*").where({ email: email });
  return result;
};

const verifyCredentials = async (email, password) => {
  const users = knex("users");
  const [user] = await users.select("*").where({ email: email });
  const result = user ? await bcrypt.compare(password, user.password) : false;
  if (result) {
    return user;
  } else {
    return false;
  }
};

const getAllUsers = async () => {
  const users = knex("users");
  const result = await users.select(["id", "username", "email"]);
  return result;
};

const createUser = async ({ username, email, password }) => {
  const hashedPW = await bcrypt.hash(password, 10);
  const users = knex("users");
  const [result] = await users
    .insert({ username, email, password: hashedPW })
    .returning("id");
  return result;
};

const createGoogleUser = async ({ username, email }) => {
  const users = knex("users");
  const [result] = await users
    .insert({ username, email, isGoogleLogin: true })
    .returning("id");
  return result;
};

const verifyGoogleCredentials = async (idToken) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken,
    });
    const payload = ticket.getPayload();
    const { email, given_name, family_name } = payload;
    return { email, firstName: given_name, lastName: family_name };
  } catch (e) {
    throw new Error("Something went wrong...");
  }
};

const checkIfGoogleUser = async (email) => {
  const users = knex("users");
  const [result] = await users
    .select("*")
    .where({ email: email, isGoogleLogin: true });
  return result;
};

module.exports = {
  getUserByEmail,
  createUser,
  getAllUsers,
  verifyCredentials,
  verifyGoogleCredentials,
  createGoogleUser,
  checkIfGoogleUser,
};
