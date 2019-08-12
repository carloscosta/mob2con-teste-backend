
// unit test https://mherman.org/blog/testing-node-and-express/#unit-tests

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

// only parses json data
app.use(bodyParser.json());
// handles the urlencoded bodies
app.use(bodyParser.urlencoded({
    extended: true
}));

// Middleware dependencies
const { checkAdmin, checkSession } = require('./middleware');

// Model dependencies
const { User, Network, Visitor, Session } = require('./sequelize');

// create a given user
app.post('/api/users', checkAdmin, function(req, res) {
    User.create(req.body).then(user => res.json(user));
});

// update a given user
app.put('/api/users/:login', ceckAdmin, function(req, res) {
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
app.get('/api/users/:login?', checkAdmin, function(req, res) {
    if (req.param.login)
        User.find({ where: { login: req.param.login } }).then(user => res.json(user));
    else
        User.findAll().then(users => res.json(users));
});

// delete a given user
app.delete('/api/users/:login', checkAdmin, function(req, res) {
    User.destroy({ where: { login: req.param.login } }).on('success', function () {
        res.json("{ \"msg\": \"success\" }");
    });
});


// create a network 
app.post('/api/networks', checkAdmin, function(req, res) {
    Network.create(req.body).then(user => res.json(user));
});

// update a given network 
app.put('/api/networks/:cnpj', checkAdmin, function(req, res) {
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
app.get('/api/networks/:cnpj?', checkAdmin, function(req, res) {
    if (req.params.cnpj)
        Network.find({ where: { cnpj: req.param.cnpj } }).then(net => res.json(net));
    else
        Network.findAll().then(users => res.json(users));
});

// delete a given network 
app.delete('/api/networks/:cnpj', checkAdmin, function(req, res) {
    Network.destroy({ where: { cnpj: req.param.cnpj } }).on('success', function() {
        res.json("{ \"msg\": \"success\" }");
    });
});


// create a visitor 
app.post('/api/visitors', checkSession, function(req, res) {
    Visitors.create(req.body).then(visitor => res.json(visitor));
});

// update a given visitor 
app.put('/api/visitors/:name', checkSession, function(req, res) {
    Visitor.find({ where: { name: req.param.name } }).on('success', function(visitor) {
        // Check if record exists in db
        if (visitor) {
            visitor.update(req.body).success(function (res) {
                res.json(visitor);
            });
        }
    });
});

// get all visitors or get a given visitor 
app.get('/api/visitors/:name?', checkSession, function(req, res) {
    if (req.params.name)
        Visitors.find({ where: { name: req.param.name } }).then(visit => res.json(visit));
    else
        Visitor.findAll().then(users => res.json(users));
});

// delete a given visitor
app.delete('/api/visitors/:name', checkSession, function(req, res) {
    Visitor.destroy({ where: { name: req.param.name } }).on('success', function() {
        res.json("{ \"msg\": \"success\" }");
    });
});

// get total of networks and its visitors
app.get('/api/', function(req, res) {
    var total = {};
    Visitor.findAll().on('success', function(visitor) {
        // Check if record exists in db
        if (visitor) {
            if (total.hasOwnProperty(visitor.network)) {
                total[visitor.network] = total[visitor.network] + 1;
            } else {
                total[visitor.network] = 1;
            }
        }
    });
    res.json(total);
});

// user login
app.post(t'/api/login/', function(req, res) {
    let login = req.body.login || null;
    let password = req.body.password || null;

    if (!login and !password)
        res.json("{ \"msg\": \"error: no login or password\" }");

    var pass_token = jwt.sign(login, password);

    User.find({ where: { login: login, password: pass_token } }).then(function() {
        // TODO: run some random generator here, for session tokens
        var token = jwt.sign(login, "super-private-token-secret");
        Session.create({ login: login, token: token }).then(session => res.json(session));
    });

    res.json("{ \"msg\": \"error: user not found\" }");
});

// user logout
app.post(t'/api/logout/', function(req, res) {
    Session.destroy({ where: { login: req.param.login } }).on('success', function() {
        res.json("{ \"msg\": \"success\" }");
    });
    res.json("{ \"msg\": \"Error: session not found\" }");
});


/* MAIN */
const port = 3000;
app.listen(port, function() {
    console.log(`Running on http://localhost:${port}`);
});
