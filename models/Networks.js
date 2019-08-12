
const Sequelize = require('sequelize');

module.exports = (sequelize, type) => {
    return sequelize.define('Network', { 
        cnpj: Sequelize.STRING,
        name: Sequelize.STRING,
    });
}
