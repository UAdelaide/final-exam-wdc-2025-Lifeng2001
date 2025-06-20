const express = require('express');
const router = express.Router();
const db = require('../models/db');
router.get('/my-dogs', async (req, res) => {
    console.log('Session in /my-dogs:', req.session);

     if (!req.session.user || !req.session.user.id) {
        return res.status(401).json({ error: 'Not logged in' });
      }

      const ownerId = req.session.user.id;
      console.log('ownerID',ownerId);

    try {
      const [rows] = await db.query('SELECT dog_id, name FROM Dogs WHERE owner_id = ?',[ownerId]);
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch dogs' });
    }
  });
  router.get('/', async (req, res) => {
    try {
      const [rows] = await db.query('SELECT * from Dogs',[ownerId]);
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch dogs' });
    }
  });
  module.exports = router;


