// server.js
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();
app.use(cors());
app.use(express.json()); // JSON body parsing middleware
app.use('/api/auth', authRoutes);

// simple route
app.get('/', (req, res) => {
  res.send('Hello World! Backend fut!');
});

// server start 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});