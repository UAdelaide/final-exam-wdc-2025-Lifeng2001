const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/api/walker/summary', async(req, res) => {
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
        SELECT w.walker_username AS walker_username,
        COUNT(r.rating AS total_ratings,
        AVG(r.rating) AS average_rating,
        COUNT ()
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
