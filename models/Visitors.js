
const Sequelize = require('sequelize');

module.exports = (sequelize, type) => {
    return sequelize.define('Visitor', { 
        name: Sequelize.STRING,
        network: Sequelize.STRING
    });
}

