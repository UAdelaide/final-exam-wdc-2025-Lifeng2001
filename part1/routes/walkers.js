const express = require('express');
const router = express.Router();
const { getDb } = require('../db');

router.get('/api/walkers/summary', async (req, res) => {
    const db = getDb();
    const sql = `
        SELECT u.username AS walker_username,
        COUNT(r.rating) AS total_ratings,
        AVG(r.rating) AS average_rating,
        COUNT(CASE WHEN wr.status = 'completed' THEN 1 END) AS completed_walks
        FROM Users u
        LEFT JOIN WalkRatings r ON u.user_id= r.walker_id
        LEFT JOIN WalkRequests wr ON r.request_id = wr.request_id
        WHERE u.role = 'walker'
        GROUP BY u.user_id,u.username
        ORDER BY u.username
    `;

    try {
        const [results] = await db.query(sql);
        res.json(results);
    } catch (error) {
        console.error('Error fetching open walkers:', error);
        res.status(500).json({ error: 'Failed to fetch walkers' });
    }
});

module.exports = router;
