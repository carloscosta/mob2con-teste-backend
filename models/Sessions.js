
const Sequelize = require('sequelize');

module.exports = (sequelize, type) => {
    return sequelize.define('Session', { 
        token: Sequelize.STRING,
        login: Sequelize.STRING
    });
}

