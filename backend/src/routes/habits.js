// routes/habits.js

const express = require('express');
const router = express.Router();
const authMiddleware = require('../Middleware/authMiddleware');
const app = express()


app.get('/blog', (req, res) => {
  res.send("Hello NODE API")
})

//Protected route, only accessible with a valid JWT token
//router.get('/protected', authMiddleware, (req, res) => {
//  res.json({ message: 'This is a protected route.' });
//});

module.exports = router;
