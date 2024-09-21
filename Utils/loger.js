const jwt = require('jsonwebtoken');

// Function to create a JWT token
const generateToken = (userId, secret, expiresIn = '1h') => {
  try {
    return jwt.sign({ id: userId }, secret, { expiresIn });
  } catch (error) {
    throw new Error('Failed to generate token');
  }
};

// Function to verify and decode a JWT token
const verifyToken = (token, secret) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    throw new Error('Invalid token');
  }
};

module.exports = { generateToken, verifyToken };
