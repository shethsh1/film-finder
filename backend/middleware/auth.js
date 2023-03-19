const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server');
const publicKey = process.env.JWT_PUBLIC_KEY;

function auth(req) {
  // Get the authorization header from the context
  const token = req.header('x-auth-token');

  // Extract the token from the header

  if (token) {
    try {
      // Verify the token and decode its payload
      const user = jwt.verify(token, publicKey);

      // Add the user object to the context
      req.jwt = user;
    } catch (error) {
      throw new AuthenticationError('Invalid/Expired token');
    }
  } else {
    throw new Error("Authentication token must be 'Bearer [token]'");
  }
}

module.exports = { auth };
