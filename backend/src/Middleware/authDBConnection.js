const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../Models/userModel');
const connectToDatabase = require('../db/conn.js');

const router = express.Router();

// Middleware to connect to the database
async function connectToDbMiddleware(req, res, next) {
  try {
    const db = await connectToDatabase();
    req.db = db; // Attach the database connection to the request object
    next(); // Continue processing the request
  } catch (error) {
    console.error('Error connecting to the database:', error);
    res.status(500).send('Internal Server Error');
  }
}



router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Authenticate the user
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      // Invalid credentials
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    // Generate a token for the authenticated user
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    // Send a JSON response indicating successful login with the token
    res.json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




module.exports = {
  router,
  connectToDbMiddleware,
};
