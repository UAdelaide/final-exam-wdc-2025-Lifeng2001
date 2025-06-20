const mysql = require('mysql2/promise');

let db;

async function initDatabase() {
  try {
    // Connect to MySQL without specifying a database
    const connection = await mysql.createConnection({
      // host: 'localhost',

    // user: 'root',
    // password: ''
    database: 'DogWalkService'
    });

    // Create the database if it doesn't exist
    await connection.query('CREATE DATABASE IF NOT EXISTS DogWalkService');
    await connection.end();

    // Now connect to the created database
    db = await mysql.createConnection({
      // host: 'localhost',

    // user: 'root',
    // password: ''
    database: 'DogWalkService',
    multipleStatements:true
    });
    const schemaSql = require('fs').readFileSync('./dogwalks.sql','utf8');
    console.log('Database initialized successfully');
} catch (err) {
    console.error('Database initialization failed:', err);
}
}



module.exports = {initDatabase,db:()=>db};
