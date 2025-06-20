var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dogsRouter = require('./routes/dogs');
var walkrequestsRouter = require('./routes/walkrequests');
var walkersRouter = require('./routes/walkers');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/',dogsRouter);
app.use('/',walkrequestsRouter);
app.use('/',walkersRouter);

const database = require('./db');

(async()=> {
    try {
        INSERT INTO Users (username, email, password_hash, role)
VALUES
    ('alice123', 'alice@example.com', 'hashed123', 'owner'),
    ('bobwalker','bob@example.com', 'hashed456', 'walker'),
    ('carol123', 'carol@example.com', 'hashed789', 'owner'),
    ('joes123','joes@example.com', 'hashed111','walker'),
    ('momo123','momo@example.com', 'hashed222','owner');


    } catch (err) {
        console.error('Error setting up database. Ensure Mysql is running: service mysql start', err);
    }
})();




module.exports = app;
