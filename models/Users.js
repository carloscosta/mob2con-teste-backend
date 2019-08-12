
const Sequelize = require('sequelize');

module.exports = (sequelize, type) => {
    return sequelize.define('User', {
        name: Sequelize.STRING,
        login: Sequelize.STRING,
        password: Sequelize.STRING,
        network: Sequelize.STRING
    });
}
