// routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db/database');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username és password kötelező' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.run(query, [username, hashedPassword], function(err) {
      if (err) {
        if (err.message.includes('UNIQUE')) {
          return res.status(400).json({ message: 'A felhasználónév már foglalt' });
        }
        return res.status(500).json({ message: 'Hiba az adatbázisban', error: err.message });
      }
      res.status(201).json({ message: 'Felhasználó sikeresen létrehozva', userId: this.lastID });
    });
  } catch (error) {
    res.status(500).json({ message: 'Hiba történt', error: error.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username és password kötelező' });
  }

  try {
    // Felhasználó keresése az adatbázisban
    const query = 'SELECT * FROM users WHERE username = ?';
    db.get(query, [username], async (err, user) => {
      if (err) {
        return res.status(500).json({ message: 'Hiba az adatbázisban', error: err.message });
      }
      if (!user) {
        return res.status(400).json({ message: 'Helytelen felhasználónév vagy jelszó' });
      }

      // Jelszó ellenőrzése
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(400).json({ message: 'Helytelen felhasználónév vagy jelszó' });
      }

      // JWT generálása
      const jwt = require('jsonwebtoken');
      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.json({ message: 'Sikeres login', token });
    });
  } catch (error) {
    res.status(500).json({ message: 'Hiba történt', error: error.message });
  }
});

module.exports = router;