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
        SELECT w.request_id,
        d.name AS dog_name,
        w.requested_time,
        w.duration_minutes,
        w.location,
        u.username AS owner_username
        From WalkRequests w
        JOIN Dogs d ON w.dog_id = d.dog_id
        JOIN Users u ON d.owner_id = u.user_id
        WHERE w.
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
