const express = require('express');
const router = express.Router();
const { getDb } = require('../db');

router.get('/api/walkrequests/open', async(req, res) => {
    const 
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
        WHERE w.status = 'open'
    `;

    try {
        const [results] = await db.query (sql);
        res.json(results);
    } catch (error) {
        console.error('Error fetching open walk requests:', error);
        res.status(500).json({ error: 'Failed to fetch walk requests'});
    }
});

module.exports = router;
