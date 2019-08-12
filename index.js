
// unit test https://mherman.org/blog/testing-node-and-express/#unit-tests

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// only parses json data
app.use(bodyParser.json());
// handles the urlencoded bodies
app.use(bodyParser.urlencoded({
    extended: true
}));

// Model dependencies
const { User, Blog, Tag } = require('./sequelize');

// create a given user
app.post('/api/users', function(req, res) {
    User.create(req.body).then(user => res.json(user));
});

// update a given user
app.put('/api/users/:login', function(req, res) {
    User.find({ where: { login: req.param.login } }).on('success', function (user) {
        // Check if record exists in db
        if (user) {
            user.update(req.body).success(function (res) {
                res.json(user);
            });
        }
    });
});

// get all users or get a given users
app.get('/api/users/:login?', function(req, res) {
    if (req.param.login)
        User.find({ where: { login: req.param.login } }).then(user => res.json(user));
    else
        User.findAll().then(users => res.json(users));
});

// delete a given user
app.delete('/api/users/:login', function(req, res) {
    User.destroy({ where: { login: req.param.login } }).on('success', function () {
        res.json("{ \"msg\": \"success\" }");
    });
});


// create a network 
app.post('/api/networks', function(req, res) {
    Network.create(req.body).then(user => res.json(user));
});

// update a given network 
app.put('/api/networks/:cnpj', function(req, res) {
    Network.find({ where: { cnpj: req.param.cnpj } }).on('success', function (net) {
        // Check if record exists in db
        if (net) {
            net.update(req.body).success(function (res) {
                res.json(net);
            });
        }
    });
});

// get all Networks or get a given network 
app.get('/api/networks/:cnpj?', function(req, res) {
    if (req.params.cnpj)
        Network.find({ where: { cnpj: req.param.cnpj } }).then(net => res.json(net));
    else
        Network.findAll().then(users => res.json(users));
});

// delete a given network 
app.delete('/api/networks/:cnpj', function(req, res) {
    Network.destroy({ where: { cnpj: req.param.cnpj } }).on('success', function () {
        res.json("{ \"msg\": \"success\" }");
    });
});


// create a visitor 
app.post('/api/visitors', function(req, res) {
    Visitors.create(req.body).then(visitor => res.json(visitor));
});

// update a given visitor 
app.put('/api/visitors/:name', function(req, res) {
    Visitor.find({ where: { name: req.param.name } }).on('success', function (visitor) {
        // Check if record exists in db
        if (visitor) {
            visitor.update(req.body).success(function (res) {
                res.json(visitor);
            });
        }
    });
});

// get all visitors or get a given visitor 
app.get('/api/visitors/:name?', function(req, res) {
    if (req.params.name)
        Visitors.find({ where: { name: req.param.name } }).then(visit => res.json(visit));
    else
        Visitor.findAll().then(users => res.json(users));
});

// delete a given visitor
app.delete('/api/visitors/:name', function(req, res) {
    Visitor.destroy({ where: { name: req.param.name } }).on('success', function () {
        res.json("{ \"msg\": \"success\" }");
    });
});

// get total of networks and its visitors
app.get('/', function(req, res) {
    res.json("{ \"msg\": \"success\" }");
});


/* MAIN */
const port = 3000;
app.listen(port, function() {
    console.log(`Running on http://localhost:${port}`);
});
