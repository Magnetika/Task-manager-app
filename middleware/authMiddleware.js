// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']; // Bearer TOKEN
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Token hiányzik' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Érvénytelen token' });
    req.user = user; // user ID és username elérhető lesz a route-okban
    next();
  });
}

module.exports = authenticateToken;