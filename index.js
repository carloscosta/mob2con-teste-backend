
/* server.js */

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsonWebToken = require('jsonwebtoken');

/* set admin secret key, which we will use for 
 * creating and decoding JWT tokens, keep it safe ;) 
 * */
const myJWTSecretKey = 'mob2con-teste-backend';

// only parses json data
app.use(bodyParser.json());
// handles the urlencoded bodies
app.use(bodyParser.urlencoded({
    extended: true
}));

// only requests to /users/* will be sent to our "router"
var Users = require('./models/Users.js');
app.use('/users', Users);

/* 
 * GET http://localhost:3000/verify/{token}
 * 
 *  token as number
 * */
app.get('/', (req, res) => {
    // get user object from the data source, Ex: database
    const user = {
        email: 'crncosta@gmail.com',
        id: 1,
        name: 'Carlos Roberto Costa'
    };

    // sign with default (HMAC SHA256)
    const token = jsonWebToken.sign(user, myJWTSecretKey);
    res.json({
        token: token
    });
});


/* 
 * GET http://localhost:3000/verify/{token}
 * 
 *  token as number
 * */
app.get('/verify/:token', (req, res) => {
    try {
        const tokenDecodedData = jsonWebToken.verify(req.params.token, myJWTSecretKey);
        return res.json({
            error: false,
            data: tokenDecodedData
        });
    } catch (error) {
        res.json({
            error: true,
            data: error
        });
    }
})

/* MAIN */
app.listen(3000, () => {
    console.log(`Server is running at: 3000`);
});
