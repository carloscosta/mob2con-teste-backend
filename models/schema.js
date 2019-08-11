
const database = "postgres://diwibodm:fiNTcjLX6Y_CaJHDjYWFAr0iF2O3mTvh@tuffi.db.elephantsql.com:5432/diwibodm";
const Sequelize = require('sequelize'), 
    var sequelize = new Sequelize(database, 'diwibodm', 'fiNTcjLX6Y_CaJHDjYWFAr0iF2O3mTvh', {
        dialect: "postgres",
        port:    5432
    });

sequelize.authenticate().then(function(err) {
    console.log('Connection has been established successfully.');
}, function (err) {
    console.log('Unable to connect to the database:', err);
});


var User = sequelize.define('User', {
    name: Sequelize.STRING,
    login: Sequelize.STRING,
    password: Sequelize.STRING,
    network: Sequelize.STRING
});

var Network = sequelize.define('Network', { 
    cnpj: Sequelize.STRING,
    name: Sequelize.STRING,
});

var Visitor = sequelize.define('Visitor', { 
    name: Sequelize.STRING,
    network: Sequelize.STRING
});


sequelize.sync({ force: true }).then(function(err) {
    console.log('It worked!');
}, function (err) {
    console.log('An error occurred while creating the table:', err);
});

