const express = require('express');
const path = require('path');
const session = require('express-session');
require('dotenv').config();

const app = express();
app.use(session({
    secret: '1234',
    resave:false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000*60*60*24
    }
}));
// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

// Routes
const walkRoutes = require('./routes/walkRoutes');
const userRoutes = require('./routes/userRoutes');
const dogRoutes = require('./routes/dogRoutes');
app.use('/api/walks', walkRoutes);
app.use('/api/users', userRoutes);
app.user('/api/dog', walkRoutes);

// Export the app instead of listening here
module.exports = app;