const mysql = require('mysql');

const db = mysql.createConnection({
   user: 'root',
   host: '127.0.0.1',
   password: 'password',
   database: 'crud_demo',
});

module.exports = db;
