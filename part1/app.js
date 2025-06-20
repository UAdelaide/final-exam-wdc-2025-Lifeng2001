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




    INSERT INTO Dogs (owner_id, name, size)
VALUES
((SELECT user_id FROM Users WHERE username ='alice123'), 'Max', 'medium'),
((SELECT user_id FROM Users WHERE username ='carol123'), 'Bella', 'small'),
((SELECT user_id FROM Users WHERE username ='alice123'), 'Bingo', 'large'),
((SELECT user_id FROM Users WHERE username ='carol123'), 'Tmood', 'small'),
((SELECT user_id FROM Users WHERE username ='momo123'), 'Stake', 'medium');





INSERT INTO WalkRequests(dog_id, requested_time, duration_minutes, location, status)
VALUES
((SELECT dog_id FROM Dogs WHERE name = 'Max'),'2025-06-10 08:00:00',30,'Parklands', 'open'),
((SELECT dog_id FROM Dogs WHERE name = 'Bella'),'2025-06-10 09:30:00',45,'Beachside Ave', 'accepted'),
((SELECT dog_id FROM Dogs WHERE name = 'Bingo'),'2025-06-10 10:30:00',60,'North Terrace', 'open'),
((SELECT dog_id FROM Dogs WHERE name = 'Tmood'),'2025-06-10 12:00:00',30,'Torrens Ave', 'cancelled'),
((SELECT dog_id FROM Dogs WHERE name = 'Stake'),'2025-06-10 14:00:00',50,'South Tce', 'completed');


    } catch (err) {
        console.error('Error setting up database. Ensure Mysql is running: service mysql start', err);
    }
})();




module.exports = app;
