
const Sequelize = require('sequelize')
const UserModel = require('./models/users')
const VisitorModel = require('./models/Visitors')
const NetworkModel = require('./models/Networks')

const sequelize = new Sequelize('diwibodm', 'diwibodm', 'fiNTcjLX6Y_CaJHDjYWFAr0iF2O3mTvh', {
    host: "tuffi.db.elephantsql.com",
    dialect: "postgres",
    port:    5432
});

const User = UserModel(sequelize, Sequelize)
const Network = NetworkModel(sequelize, Sequelize)
const Visitor = VisitorModel(sequelize, Sequelize)

module.exports = {
    User,
    Network,
    Visitor
}
