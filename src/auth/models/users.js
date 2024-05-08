//models/users.js

'use strict';
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = { username: 'admin' };  // TEST user object
const token = jwt.sign(user, process.env.SECRET);
console.log("Generated JWT:", token);
const secretKey = process.env.SECRET;

const userSchema = (sequelize, DataTypes) => {
  const model = sequelize.define('User', {
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false, },
    token: {
      type: DataTypes.VIRTUAL,
      get() {
        return jwt.sign({ username: this.username }, secretKey);
      }
    }
  });

  model.beforeCreate(async (user) => {
    user.password = await bcrypt.hash(user.password, 10);
  });

  // Basic AUTH: Validating strings (username, password) 
  model.authenticateBasic = async function (username, password) {
    const user = await this.findOne({
      where: { username }
    });
  
    if (user) {
      const valid = await bcrypt.compare(password, user.password);
      if (valid) {
        return user;
      }
    }
  
    throw new Error('Invalid User');
  };
  

  // Bearer AUTH: Validating a token
  model.authenticateWithToken = async function (token) {
    try {
      console.log('Authenticating with token:', token);
  
      const parsedToken = jwt.verify(token, process.env.SECRET);
      console.log('Parsed Token Data:', parsedToken);
  
      const user = await this.findOne({
        where: { username: parsedToken.username }
      });
  
      if (!user) {
        console.error('User not found for username:', parsedToken.username);
        throw new Error('User Not Found');
      }
  
      console.log('User authenticated:', user.username);
      return user;
    } catch (e) {
      console.error('Token Verification Error:', e.message);
      throw new Error(e.message);
    }
  };
  return model;
}

module.exports = userSchema;


//Changes to users.js BASIC AUTH
// 1. Sequelize Model Updates:
// Corrected the findOne call within authenticateBasic to ensure it filters properly by using where.
// 2. Improved Error Handling:
// Added checks to verify user existence before attempting password comparison.
// Implemented specific error messages for various cases like "Invalid User."
// 3. Before Hook Improvement:
// Added an await keyword for bcrypt.hash in the beforeCreate hook to ensure password hashing occurs synchronously.


//Changes to users.js BEARER AUTH
// 1. Authenticate With Token Method:
// Added proper error handling and logging to identify issues with token verification.
// Ensured that user queries include a where clause to properly fetch the user based on the token's username.
// Added detailed error messages to distinguish between different failure reasons (e.g., "User Not Found" vs. token verification errors).