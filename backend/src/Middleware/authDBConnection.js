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

router.use(connectToDbMiddleware);

router.post('/auth/register', async (req, res) => {
  try {
    const { firstName, lastName, username, password } = req.body;
    const collection = req.db.collection("users");

    // Check if the username is already taken
    const existingUser = await collection.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    // Create a new user instance
    const newUser = new User({ firstName, lastName, username, password });

    // Save the new user to the database
    await newUser.save();

    // Generate a token for the new user
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '100h' });

    // Send a JSON response indicating successful registration
    res.status(201).json({ message: 'Registration successful', token });

  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const collection = req.db.collection("users");
    const user = await collection.findOne({ username });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '3h' });
    res.json({ message: 'Login successful', token, user });

  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



module.exports = {
  router,
  connectToDbMiddleware,
};
