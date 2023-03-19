const jwt = require("jsonwebtoken");
const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY;

const createToken = ({ email, userId, username, expiredTime }) => {
  const token = jwt.sign({ email, userId, username }, JWT_PRIVATE_KEY, {
    expiresIn: expiredTime,
    algorithm: "RS256",
  });
  return token;
};

module.exports = { createToken };
