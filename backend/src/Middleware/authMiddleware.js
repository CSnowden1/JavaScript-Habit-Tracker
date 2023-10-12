const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const token = req.header('Authorization');

  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(token, 'your-secret-key', (err, user) => {
    if (err) return res.status(403).json({ message: 'Forbidden' });

    req.user = user;
    next();
  });
}



// Use the middleware in routes that require authentication
router.get('/secure-route', authenticateToken, (req, res) => {
  res.json({ message: 'Secure Route', user: req.user });
});
