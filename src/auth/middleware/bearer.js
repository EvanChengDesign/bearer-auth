//middleware/bearer.js

'use strict';

const { users } = require('../models/index.js');

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    console.error('No authorization header provided');
    return res.status(401).send('No authorization header provided');
  }

  try {
    // Log the entire authorization header for debugging
    console.log('Authorization Header:', req.headers.authorization);

    const tokenParts = req.headers.authorization.split(' ');
    if (tokenParts[0] !== 'Bearer' || tokenParts.length !== 2) {
      console.error('Invalid Authorization Header:', req.headers.authorization);
      throw new Error('Invalid Authorization Header');
    }

    const token = tokenParts[1];
    console.log('Extracted Token:', token);

    const validUser = await users.authenticateWithToken(token);
    console.log('Authenticated User:', validUser.username);

    req.user = validUser;
    next();
  } catch (e) {
    console.error('Authentication Error:', e.message);
    res.status(403).send('Invalid Login');
  }
};


// Changes made:
// The bearer.js middleware file was adjusted to properly extract and verify JWT tokens from the Authorization header:

// 1. Middleware Structure and Error Handling:
// Added checks to ensure the Authorization header is properly formatted and contains a bearer token.
// Improved error responses and logging to diagnose issues with token extraction or format.