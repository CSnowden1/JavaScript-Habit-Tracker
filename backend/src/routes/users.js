const express = require('express');
const authDBConnection = require('../Middleware/authDBConnection.js');
const User = require('../Models/userModel.js');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { ObjectId } = require('mongodb');
const connectToDatabase = require('../db/conn.js')
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






router.use(authDBConnection.connectToDbMiddleware);
router.use('/auth', authDBConnection.router);




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
    await newUser.save()

    // Generate a token for the new user
    const token = jwt.sign({ userId: newUser._id }, secretKey, { expiresIn: '100h' });

    // Send a JSON response indicating successful registration
    res.status(201).json({ message: 'Registration successful', token });
    
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Authenticate the user
    const collection = req.db.collection("users");
    const user = await collection.findOne({ username });

    if (!user || !(await user.comparePassword(password))) {
      // Invalid credentials
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a token for the authenticated user
    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '3h' });

    // Send a JSON response indicating successful login with the token
    res.json({ message: 'Login successful', token, user });
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
