const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/api/dogs',(req, res)=>) {
    const sql ='SELECT * From '
}