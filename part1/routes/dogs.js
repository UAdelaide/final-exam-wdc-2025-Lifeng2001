const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/api/dogs', (req, res) => {

    const sql = 'SELECT d.name AS dog_name, d.size, u.username AS owner_username
    From Dogs d JOIN User ON d.owner_id = u.user_id';
    db.query = (sql, (err, results)) => {
        if (err) {
            console.error('error:', err);
            return res.status(500).json({ error: 'Failed to fetch dogs' });
        }
        res.json(results);
    });

});