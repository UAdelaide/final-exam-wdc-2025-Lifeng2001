const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/api/dogs', async(req, res) => {

    // "request_id": 1,
    // "dog_name": "Max",
    // "requested_time": "2025-06-10T08:00:00.000Z",
    // "duration_minutes": 30,
    // "location": "Parklands",
    // "owner_username": "alice123"
    const sql = `
        SELECT d.name AS dog_name, d.size, u.username AS owner_username
        FROM Dogs d
        JOIN Users u ON d.owner_id = u.user_id
    `;

    try {
        const [results] = await db.query (sql);
        res.json(results);
    } catch (error) {
        console.error('Error fetching dogs:', error);
        res.status(500).json({ error: 'Failed to fetch dogs'});
    }
});

module.exports = router;
