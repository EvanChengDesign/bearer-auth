'use strict';

const base64 = require('base-64');
const { users } = require('../models/index.js');

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    console.log('No authorization header present');
    return _authError(res, 'Invalid or missing authorization header', 401);
  }

  const parts = req.headers.authorization.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Basic') {
    console.log('Authorization header format is incorrect:', req.headers.authorization);
    return _authError(res, 'Invalid authorization header format', 401);
  }

  const encoded = parts[1];
  let decoded;
  try {
    decoded = base64.decode(encoded);
    console.log('Decoded credentials:', decoded);
  } catch (error) {
    console.log('Error decoding Base64 string:', error);
    return res.status(400).send('Bad Request: Error decoding credentials');
  }

  const [username, pass] = decoded.split(':');
  if (!username || !pass) {
    console.log('Username or password missing:', decoded);
    return _authError(res, 'Missing username or password', 401);
  }

  try {
    req.user = await users.authenticateBasic(username, pass);
    console.log('User authenticated successfully:', req.user);
    next();
  } catch (e) {
    console.error('Authentication failed:', e.message);
    return res.status(403).send('Invalid Login');
  }
};

function _authError(res, message, statusCode = 403) {
  console.log('Authentication error:', message);
  return res.status(statusCode).send('Invalid Login');
}


// Changes made: 
// 1. Authorization Header Parsing:
// Used const instead of let for variables that don't need to be reassigned.
// Split the authorization header on a space to separate the "Basic" prefix from the actual credentials.
// 2. Improved Error Handling:
// Added an _authError helper function to provide consistent error messages and status codes.
// Included debugging console.log statements to print the received credentials and user details, helping you verify if the decoding process works correctly.