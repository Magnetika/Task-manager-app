// server.js
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todos');

const app = express();
app.use(cors());
app.use(express.json()); // JSON body parsing middleware
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

// simple route
app.get('/', (req, res) => {
  res.send('Hello World! Backend fut!');
});

// server start 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});