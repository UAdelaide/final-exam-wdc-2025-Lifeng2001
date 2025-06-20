const mysql = require('mysql/promise');
const pool = mysql.createPool({
    // host: 'localhost',

    // user: 'root',
    // password: ''
    database: 'DogWalkService'
});

module.exports = pool;