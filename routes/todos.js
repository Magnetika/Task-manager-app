const express = require('express');
const db = require('../db/database');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

// Protect all routes with JWT validation
router.use(authenticateToken);

// CREATE todo
router.post('/', (req, res) => {
  const { title, description } = req.body;
  const userId = req.user.id;

  if (!title) return res.status(400).json({ message: 'Title kötelező' });

  const query = 'INSERT INTO todos (user_id, title, description) VALUES (?, ?, ?)';
  db.run(query, [userId, title, description || ''], function(err) {
    if (err) return res.status(500).json({ message: err.message });
    res.status(201).json({ id: this.lastID, title, description });
  });
});

// READ todos
router.get('/', (req, res) => {
  const userId = req.user.id;
  const query = 'SELECT * FROM todos WHERE user_id = ?';
  db.all(query, [userId], (err, rows) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(rows);
  });
});

// UPDATE todo
router.put('/:id', (req, res) => {
  const { title, description, completed } = req.body;
  const { id } = req.params;
  const userId = req.user.id;

  const query = 'UPDATE todos SET title = ?, description = ?, completed = ? WHERE id = ? AND user_id = ?';
  db.run(query, [title, description, completed ? 1 : 0, id, userId], function(err) {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: 'Todo frissítve' });
  });
});

// DELETE todo
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  const query = 'DELETE FROM todos WHERE id = ? AND user_id = ?';
  db.run(query, [id, userId], function(err) {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: 'Todo törölve' });
  });
});

module.exports = router;