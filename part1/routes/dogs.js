const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async(req, res) => {
    const sql = `
        SELECT d.name AS dog_name, d.size, u.username AS owner_username
        FROM Dogs d
        JOIN Users u ON d.owner_id = u.user_id
    `;

    try {
        const [results] = await db.query (sql);
        res.json(results);
    } catch (error) {
        console.error
    }
});

module.exports = router;