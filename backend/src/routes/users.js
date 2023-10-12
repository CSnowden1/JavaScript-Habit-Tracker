const express = require('express');
const connectToDbMiddleware = require('../Middleware/databaseConnection.js');
const User = require('../Models/userModel.js');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { ObjectId } = require('mongodb');

const router = express.Router();


const generateSecretKey = () => {
  return crypto.randomBytes(32).toString('hex');
};

const secretKey = process.env.SECRET_KEY || generateSecretKey();

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(403).json({ message: 'Forbidden' });

    req.user = user;
    next();
  });
};

router.use(connectToDbMiddleware);
router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, username, password } = req.body;

    const collection = req.db.collection("users");

    const existingUser = await collection.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    const newUser = new User({ firstName, lastName, username, password });

    const result = await collection.insertOne(newUser);

    // Generate a token for the new user
    const token = jwt.sign({ userId: newUser._id }, secretKey, { expiresIn: '100h' });

    // Send a JSON response indicating successful registration
    res.status(201).json({ message: 'Registration successful', token });
    
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.post('/login', passport.authenticate('local'), async (req, res) => {
  try {
    const token = jwt.sign({ userId: req.user._id }, secretKey, { expiresIn: '3h' });
    res.json({ message: 'Login successful', token, user: req.user });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get("/", async (req, res) => {
  try {
    const collection = req.db.collection("users");
    const results = await collection.find({}).toArray();
    res.status(200).send(results);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const objectId = new ObjectId(id);
    const collection = req.db.collection("users");
    const query = { _id: objectId };

    const result = await collection.deleteOne(query);

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(204).json({ message: 'User Deleted' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/secure-route', authenticateToken, (req, res) => {
  res.json({ message: 'Secure Route', user: req.user });
});

// Function to hash the password
const hashPassword = async (password) => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

module.exports = router;
