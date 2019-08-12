
let jwt = require('jsonwebtoken');

// TODO: this is not example of safety, improves!
let token = jwt.sign('admin', 'mob2con-teste-backend');

console.log("token = ", token);
process.exit();
