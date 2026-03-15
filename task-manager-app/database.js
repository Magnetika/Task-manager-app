// db/database.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Adatbázis fájl elérési útja
const dbPath = path.resolve(__dirname, 'database.sqlite');

// Kapcsolódás az adatbázishoz
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Hiba az adatbázis csatlakozáskor:', err.message);
  } else {
    console.log('SQLite adatbázis csatlakoztatva!');
  }
});

// Users tábla létrehozása, ha még nincs
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
  )
`);

module.exports = db;