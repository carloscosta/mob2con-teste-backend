
//https://medium.com/dev-bits/a-guide-for-adding-jwt-token-based-authentication-to-your-single-page-nodejs-applications-c403f7cf04f4

let jwt = require('jsonwebtoken');

// Model dependencies
const { User, Blog, Tag } = require('./sequelize');
const adminSecret = 'mob2con-teste-backend';

let checkAdmin = (req, res, next) => {
  // Express headers are auto converted to lowercase
  let token = req.headers['x-access-token'] || req.headers['authorization'];
  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  if (token) {
    jwt.verify(token, adminSecret, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};

module.exports = {
  checkAdmin: checkAdmin
}

