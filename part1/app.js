var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const {initDB} = require('./db');


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

initDB();



module.exports = app;
