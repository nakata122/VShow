const express = require('express');
const server = require('./config/server');
const routes = require('./config/routes');
const encryption = require('./infrastructure/encryption');
const User = require('./models/UserSchema');
const app = express();
const port = 3001;

server(app);

routes(app);

require('./config/db')
//.then(() => {
//     let salt = encryption.generateSalt();
//     let hashedPassword = encryption.generateHashedPassword(salt, '123');

//     User.create({
//         username: 'admin',
//         money: -1,
//         roles: 'admin',
//         salt: salt,
//         expositions: [],
//         hashedPass: hashedPassword
//     });
// });
require('./config/passport')();
app.listen(process.env.PORT || port, () => console.log('App listening on ' + port));

