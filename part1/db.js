const mysql = require('mysql/promise');

const db = mysql.createPool({
    // host: 'localhost',

    // user: 'root',
    // password: ''
    database: 'DogWalkService'
});

module.exports = db;
