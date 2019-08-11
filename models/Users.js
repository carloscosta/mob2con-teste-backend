
/* 
 * Sequelize supports two way of schema management:
 *
 *  - We can program our migrations, which programmatically changes the database's structure. 
 *    Migrations takes more time to setup, but it is best choice for deploy our application 
 *    on many different server environments. The reason for that is based on the fact that 
 *    migrations are consistently changing our database according to the current state of the 
 *    schema.

 *  - We can let Sequelize create the tables for you. The automated way of using Sequelize's 
 *    function sequelize.sync will probably be a good choice if we just want to quickly spin 
 *    up a prototype.
 *
 *    I will skip migrations for now and take use of the automated way.
 *
 * */

var express  = require('express');
var router = express.Router();

// invoked for any requested passed to this router
router.use(function(req, res, next) {
  // .. some logic here .. like any other middleware
  next();
});

// will handle any request that ends in /add
// depends on where the router is "use()'d"
router.get('/events', function(req, res, next) {
  // ..
});

module.exports = router; 
