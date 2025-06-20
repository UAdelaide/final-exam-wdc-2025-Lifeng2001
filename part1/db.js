const mysql = require('mysql/promise');
const pool = mysql.createPool(
    {
        // host: 'localhost'
    database:'DogWalkService'

});
module.exports = pool;