const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/api/walkers/summary', async(req, res) => {
    // [
    //     {
    //       "walker_username": "bobwalker",
    //       "total_ratings": 2,
    //       "average_rating": 4.5,
    //       "completed_walks": 2
    //     },
    //     {
    //       "walker_username": "newwalker",
    //       "total_ratings": 0,
    //       "average_rating": null,
    //       "completed_walks": 0
    //     }
    //   ]

    const sql = `
        SELECT u.username AS walker_username,
        COUNT(r.rating) AS total_ratings,
        AVG(r.rating) AS average_rating,
        COUNT(CASE WHEN wk.status = 'completed' THEN 1 END) AS completed_walks
        FROM Users u
        LEFT JOIN WalkRating r ON u.user
        GROUP BY w.walker_id,w.username
        ORDER BY w.username
    `;

    try {
        const [results] = await db.query (sql);
        res.json(results);
    } catch (error) {
        console.error('Error fetching open walkers:', error);
        res.status(500).json({ error: 'Failed to fetch walkers'});
    }
});

module.exports = router;
