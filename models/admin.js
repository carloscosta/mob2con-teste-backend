
const jwt = require('jsonwebtoken');
const fs = require('fs')
const admin_file = './test/admin.token'

fs.unlink(admin_file, function(err) { if (err) { throw err; } });

// TODO: this is not example of safety, improves!
let token = jwt.sign('admin', 'mob2con-teste-backend');

console.log("token = ", token);

fs.appendFile(admin_file, token, function(err) {
    if (err) {
        console.log("ERROR", err); 
        process.exit(666);
    }
    process.exit();
});
