const knex = require("../db/knex");
const bcrypt = require("bcrypt");

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

module.exports = {
  getUserByEmail,
  createUser,
  getAllUsers,
  verifyCredentials,
};
