const jwt = require('jsonwebtoken');

const generateToken = (userId, secret, expiresIn = '1h') => {
  try {
    return jwt.sign({ id: userId }, secret, { expiresIn });
  } catch (error) {
    throw new Error('Failed to generate token');
  }
};

const verifyToken = (token, secret) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    throw new Error('Invalid token');
  }
};

module.exports = { generateToken, verifyToken };
