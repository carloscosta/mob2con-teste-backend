
/* For unit and endpoint test:
 * https://mherman.org/blog/testing-node-and-express/#unit-tests
 * https://codehandbook.org/unit-test-express-route/
 *
 * http localhost:3000/api/users "Authorization: Token eyJhbGciOiJIUzI1NiJ9.YWRtaW4.fGlCfxXTF4kxa1x3nxULthV5ewP2YezFIuqJy9piQRI"
 */

const fs = require('fs');
const assert = require('assert');
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../index.js')
const jwt = require('jsonwebtoken');
const admin_token = fs.readFileSync(__dirname + '/admin.token', 'utf8'); 


describe('GET / route', function() {
    it('should return 302 status', function() {
        return request(app).get('/').then(function(response) {
            assert.equal(response.status, 302);
        })
    });
});

describe('GET /api route: get total of networks and its visitors', function() {
    it('should return 200 status', function() {
        return request(app).get('/api').then(function(response) {
            assert.equal(response.status, 200);
        })
    });
});

var new_network = {
    cnpj: "1234567890",
    name: "Acm Inc."
};
describe('POST /api/networks route: create new network', function() {
    it('should return 201 status', function() {
        return request(app)
            .post('/api/networks')
            .set('Authorization', admin_token)
            .send(new_network)
            .then(function(response) {
                assert.equal(response.status, 201);
            })
    });
});

describe('GET /api/networks route: get all networks', function() {
    it('should return 200 status', function() {
        return request(app)
            .get('/api/networks')
            .set('Authorization', admin_token)
            .then(function(response) {
                assert.equal(response.status, 200);
            })
    });
});

describe('GET /api/networks/$cnpj route: get networks by $cnpj', function() {
    it('should return 200 status', function() {
        return request(app)
            .get('/api/networks/' + new_network.cnpj)
            .set('Authorization', admin_token)
            .then(function(response) {
                assert.equal(response.status, 200);
            })
    });
});

new_network = {
    cnpj: "1234567890",
    name: "Acm and Bernies Inc."
};
describe('PUT /api/networks/$cnpj route: update network name by $cnpj', function() {
    it('should return 204 status', function() {
        return request(app)
            .put('/api/networks/' + new_network.cnpj)
            .set('Authorization', admin_token)
            .send(new_network)
            .then(function(response) {
                assert.equal(response.status, 204);
            })
    });
});

var new_user = {
    name: "John Random",
    login: "jrandom",
    password: "good-word",
    network: "Acm Inc."
};
describe('POST /api/users route: create a given user', function() {
    it('should return 200 status', function() {
        return request(app)
            .post('/api/users')
            .set('Authorization', admin_token)
            .send(new_user)
            .then(function(response) {
                assert.equal(response.status, 200);
            })
    });
});

describe('GET /api/users route: get all users', function() {
    it('should return 200 status', function() {
        return request(app)
            .get('/api/users')
            .set('Authorization', admin_token)
            .then(function(response) {
                assert.equal(response.status, 200);
            })
    });
});

describe('GET /api/users/$login route: get user by $login', function() {
    it('should return 200 status', function() {
        return request(app)
            .get('/api/users/' + new_user.login)
            .set('Authorization', admin_token)
            .then(function(response) {
                assert.equal(response.status, 200);
            })
    });
});

new_user = {
    name: "John Random Jr",
    login: "jrandom",
    password: "good-word",
    network: "Acm and Bernies Inc."
};
describe('PUT /api/users/$login route: update user by $login', function() {
    it('should return 204 status', function() {
        return request(app)
            .put('/api/users/' + new_user.login)
            .set('Authorization', admin_token)
            .send(new_user)
            .then(function(response) {
                assert.equal(response.status, 204);
            })
    });
});

var user_token = null;
describe('POST /api/login route: login a given user', function() {
    it('should return 201 status', function() {
        return request(app)
            .post('/api/login')
            .send(new_user)
            .then(function(response) {
                user_token = JSON.parse(response.text);
                //console.log("user_token", user_token.token);
                assert.equal(response.status, 201);
            })
    });
});

describe('POST /api/logout route: logout an user session', function() {
    it('should return 204 status', function() {
        return request(app)
            .post('/api/logout')
            .send(new_user)
            .then(function(response) {
                assert.equal(response.status, 204);
            })
    });
});


describe('DELETE /api/networks/$cnpj route: delete network by $cnpj', function() {
    it('should return 204 status', function() {
        return request(app)
            .delete('/api/networks/' + new_network.cnpj)
            .set('Authorization', admin_token)
            .send(new_network)
            .then(function(response) {
                assert.equal(response.status, 204);
            })
    });
});

describe('DELETE /api/users/$login route: delete user by $login', function() {
    it('should return 204 status', function() {
        return request(app)
            .delete('/api/users/' + new_user.login)
            .set('Authorization', admin_token)
            .send(new_user)
            .then(function(response) {
                assert.equal(response.status, 204);
            })
    });
});

describe('GET /api/visitors/ route: get visitors', function() {
    it('should return 200 status', function() {
        return request(app)
            .get('/api/visitors/')
            .set('Authorization', admin_token)
            .then(function(response) {
                assert.equal(response.status, 200);
            })
    });
});

var user_pass_token = jwt.sign(new_user.login, new_user.password);
describe('GET /api/visitors/$login route: get visitors by $login', function() {
    it('should return 200 status', function() {
        return request(app)
            .get('/api/visitors/' + new_user.login)
            .set('Authorization', user_pass_token)
            .then(function(response) {
                assert.equal(response.status, 200);
            })
    });
});

describe('DELETE /api/visitors/$login route: delete visitors by $login', function() {
    it('should return 204 status', function() {
        return request(app)
            .delete('/api/visitors/' + new_user.login)
            .set('Authorization', admin_token)
            .send(new_user)
            .then(function(response) {
                assert.equal(response.status, 204);
        })
    });
});

