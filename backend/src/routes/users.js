const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
const User = require('../Models/userModel.js');
const connectToDatabase = require('../db/conn.js');
const authDBConnection = require('../Middleware/authDBConnection.js');
const crypto = require('crypto');

const router = express.Router();

// Generate a secret key for JWT or use from environment variables
const generateSecretKey = () => {
  return crypto.randomBytes(32).toString('hex');
};

const secretKey = process.env.SECRET_KEY || generateSecretKey();

// Middleware to authenticate JWT token
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(403).json({ message: 'Forbidden' });

    req.user = user;
    next();
  });
};

// Middleware to connect to the database
router.use(authDBConnection.connectToDbMiddleware);

// Additional routes defined in separate file
router.use('/auth', authDBConnection.router);

// Register a new user
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
    const token = jwt.sign({ userId: newUser._id }, secretKey, { expiresIn: '100h' });

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
    //const collection = req.db.collection("users");
    // Ensure that you are getting the full user object from the database
    //const user = await collection.findOne({ username });
    const user = await User.findOne({ username });




    // Check if user exists and has the comparePassword method
    if (!user ||  !(await user.comparePassword(password))) {
      // Invalid credentials
      console.log('Invalid credentials:', { user });
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

// Get all users
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

//get User by id
router.get('/:id', async (req, res) => {
  try {
    const collection = req.db.collection("users");
    const query = { _id: new ObjectId(req.params.id) };
    const user = await collection.findOne(query);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});




router.get('/:id/habits', async (req, res) => {
  try {
    const collection = req.db.collection("users");
    const query = { _id: new ObjectId(req.params.id) };
    const user = await collection.findOne(query);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ habits: user.habits });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



router.get('/:userId/habits/:habitId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const habitId = req.params.habitId;

    const collection = req.db.collection("users");
    const query = { _id: new ObjectId(userId) };
    const user = await collection.findOne(query);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the habit by ID within the user's habits array
    const habit = user.habits.find(h => h._id.toString() === habitId);

    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    res.status(200).json({ habit });
  } catch (error) {
    console.error("Error fetching habit:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});




// Delete a user by ID
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





//Add habit to user by id
router.post('/:id/habits', async (req, res) => {
  try {
    const { name, image, frequency, time, goal, count } = req.body;
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newHabit = {
      name,
      image,
      frequency,
      time,
      goal,
      count,
    };

    user.habits.push(newHabit);

    await user.save();

    res.status(201).json({ message: 'Habit added successfully' });
  } catch (error) {
    console.error("Error creating habit:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.patch('/:userId/habits/:habitId/edit', async (req, res) => {
  try {
    const userId = req.params.userId;
    const habitId = req.params.habitId;
    const updatedHabit = req.body;

    console.log(`Received PATCH request for userId: ${userId}, habitId: ${habitId}`);
    console.log('Updated habit data:', updatedHabit);

    const user = await User.findById(userId);

    if (!user) {
      console.error('User not found');
      return res.status(404).json({ error: 'User not found' });
    }

    console.log('Found user:', user);

    const habitIndex = user.habits.findIndex((habit) => habit._id.toString() === habitId);

    if (habitIndex === -1) {
      console.error('Habit not found');
      return res.status(404).json({ error: 'Habit not found' });
    }

    console.log('Found habit:', user.habits[habitIndex]);

    // Update the habit with updatedHabit properties
    user.habits[habitIndex] = { ...user.habits[habitIndex], ...updatedHabit };

    console.log('Updated habit:', user.habits[habitIndex]);   
    console.log('User object updated in the database.');

  } catch (error) {
    console.error('Error updating habit:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




router.delete('/:userId/habits/:habitId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const habitId = req.params.habitId;

    const collection = req.db.collection("users");
    const query = { _id: new ObjectId(userId) };
    const user = await collection.findOne(query);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const habitIndex = user.habits.findIndex(h => h._id.toString() === habitId);

    if (habitIndex === -1) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    user.habits.splice(habitIndex, 1);

    await collection.updateOne({ _id: user._id }, { $set: { habits: user.habits } });

    res.status(204).json({ message: 'Habit Deleted' });
  } catch (error) {
    console.error("Error deleting habit:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.patch('/:userId/habits/:habitId/increment', async (req, res) => {
  try {
    const userId = req.params.userId;
    const habitId = req.params.habitId;

    const collection = req.db.collection("users");
    const query = { _id: new ObjectId(userId) };
    const user = await collection.findOne(query);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const habit = user.habits.find(h => h._id.toString() === habitId);

    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    habit.count++;

    await collection.updateOne({ _id: user._id }, { $set: { habits: user.habits } });

    res.status(200).json({ message: 'Count Incremented', habit });
  } catch (error) {
    console.error("Error incrementing habit count:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.patch('/:userId/habits/:habitId/decrement', async (req, res) => {
  try {
    const userId = req.params.userId;
    const habitId = req.params.habitId;

    const collection = req.db.collection("users");
    const query = { _id: new ObjectId(userId) };
    const user = await collection.findOne(query);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const habit = user.habits.find(h => h._id.toString() === habitId);

    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    if (habit.count > 0) {
      habit.count--;
    }

    await collection.updateOne({ _id: user._id }, { $set: { habits: user.habits } });

    res.status(200).json({ message: 'Count Decremented', habit });
  } catch (error) {
    console.error("Error decrementing habit count:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Secure route requiring authentication
router.get('/secure-route', authenticateToken, (req, res) => {
  res.json({ message: 'Secure Route', user: req.user });
});

// Function to hash the password (missing import for crypto)
const hashPassword = async (password) => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

module.exports = router;
