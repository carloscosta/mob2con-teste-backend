
//https://medium.com/dev-bits/a-guide-for-adding-jwt-token-based-authentication-to-your-single-page-nodejs-applications-c403f7cf04f4

let jwt = require('jsonwebtoken');

// Model dependencies
const { User, Network, Visitor, Session } = require('./sequelize');
const adminSecret = 'mob2con-teste-backend'; // TODO: this is not example of safety, improves!

let checkAdmin = function(req, res, next) {
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

let checkSession = function(req, res, next) {
    // Express headers are auto converted to lowercase
    let token = req.headers['x-access-token'] || req.headers['authorization'];

    if (token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
    }

    // TODO: tokens of 24hrs should be checked for expiration
    if (token) {
        Session.find({ where: { token: token } }).done(function (err, session) {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Auth token is not supplied'
                });
            }
            if (session) {
                req.decoded = session;
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
    checkAdmin: checkAdmin,
    checkSession: checkSession 
}

