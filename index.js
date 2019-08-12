
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
app.put('/api/users/:login', checkAdmin, function(req, res) {
    User.update(req.body, { where: { login: req.body.login }}).then(function() {
        res.status(204);
        res.end();
    });
});

// get all users or get a given users
app.get('/api/users/:login?', checkAdmin, function(req, res) {
    if (req.param.login)
        User.findOne({ login: req.param.login }).then(function(user) {
            res.json(user);
            res.end();
        });
    else
        User.findAll().then(function(users) { 
            res.json(users);
            res.end();
        });
});

// delete a given user
app.delete('/api/users/:login', checkAdmin, function(req, res) {
    User.destroy({ where: { login: req.body.login } }).then(function () {
        res.status(204);
        res.end();
    });
});

// create a network 
app.post('/api/networks', checkAdmin, function(req, res) {
    Network.findOrCreate( {where: req.body }).spread(function(net, created) { 
        res.status(201);
        res.end();
    });
});

// update a given network 
app.put('/api/networks/:cnpj', checkAdmin, function(req, res) {
    Network.update(req.body, { where: { cnpj: req.body.cnpj }}).then(function (net) {
        if (net) {
            res.status(204);
            res.end();
        }
    });
});

// get all Networks or get a given network 
app.get('/api/networks/:cnpj?', checkAdmin, function(req, res) {
    if (req.params.cnpj)
        Network.findOne({ cnpj: req.param.cnpj }).then(function(net) { 
            res.json(net);
            res.end();
        });
    else
        Network.findAll().then(function(net) {
            res.json(net);
            res.end();
        });
});

// delete a given network 
app.delete('/api/networks/:cnpj', checkAdmin, function(req, res) {
    Network.destroy({ where: { cnpj: req.body.cnpj } }).then(function() {
        res.status(204);
        res.end();
    });
});


// create a visitor 
app.post('/api/visitors', checkSession, function(req, res) {
    Visitors.create(req.body).then(function(visitor) { 
        res.status(201);
    });
});

// update a given visitor 
app.put('/api/visitors/:name', checkSession, function(req, res) {
    Visitor.find({ where: { name: req.param.name } }).then('success', function(visitor) {
        // Check if record exists in db
        if (visitor) {
            visitor.update(req.body).success(function (res) {
                res.status(204);
            });
        }
    });
});

// get all visitors or get a given visitor 
app.get('/api/visitors/:login?', checkSession, function(req, res) {
    if (req.body.login)
        Visitors.find({ where: { name: req.body.login } }).then(function(visit) { 
            res.status(200);
            res.json(visit);
        });
    else
        Visitor.findAll().then(function(visit) { 
            res.status(200);
            res.json(visit)
        });
});

// delete a given visitor
app.delete('/api/visitors/:name', checkSession, function(req, res) {
    Visitor.destroy({ where: { name: req.param.name } }).then(function() {
        res.status(204);
        res.end();
    });
});

// no root for you
app.get('/', function(req,res) {
    res.redirect(req.baseUrl + '/api/');
});

// get total of networks and its visitors
app.get('/api/', function(req, res) {
    var total = {};
    Visitor.findAll().then(function(visitor) {
        // Check if record exists in db
        if (visitor) {
            if (total.hasOwnProperty(visitor.network)) {
                total[visitor.network] = total[visitor.network] + 1;
            } else {
                total[visitor.network] = 1;
            }
        }
    });
    res.status(200);
    res.json(total);
});

// user login
app.post('/api/login/', function(req, res) {
    let login = req.body.login || null;
    let password = req.body.password || null;

    if (!login && !password) {
        res.status(400);
        res.json("{ \"msg\": \"error: no login or password\" }");
    }

    var pass_token = jwt.sign(login, password);

    User.findOne({ where: { login: login, password: pass_token } }).then(function() {
        // TODO: run some random generator here, for session tokens
        var token = jwt.sign(login, "super-private-token-secret");
        Session.create({ login: login, token: token }).then(function(session) {
            res.status(201);
            res.json(session)
        });
    });
});

// user logout
app.post('/api/login/', function(req, res) {
    let login = req.body.login || null;
    let password = req.body.password || null;

    if (!login && !password) {
        res.status(400);
        res.json("{ \"msg\": \"error: no login or password\" }");
    }

    var pass_token = jwt.sign(login, password);

    Session.findOne({ where: { login: login, password: pass_token } }).then(function() {
        Session.destroy({ where: { login: login, password: pass_token } }).then(function() {
            res.status(201);
            res.end();
        });
    });
});

// user logout
app.post('/api/logout/', function(req, res) {
    if (!req.body.login) { 
        res.status(400);
        res.json("{ \"msg\": \"Error: session not found\" }");
    }

    Session.destroy({ where: { login: req.body.login } }).then(function() {
        res.status(204);
        res.end();
    });
});


/* MAIN */
const port = 3000;
app.listen(port, function() {
    console.log(`Running on http://localhost:${port}`);
});
    module.exports = app;
