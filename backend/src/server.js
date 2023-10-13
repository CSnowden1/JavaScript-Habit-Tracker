// server.js
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const habits = require('./routes/habits.js');
const users = require('./routes/users.js');
const connectToDatabase = require('./db/conn.js');

// Middleware to enable CORS
app.use(cors({ origin: '*' }));

// Middleware to parse JSON requests
app.use(express.json());

(async () => {
  try {
    // Connect to the database and get the database object
    const db = await connectToDatabase();

    // Attach the database connection to all routes
    app.use((req, res, next) => {
      req.db = db;
      next();
    });

    // Use the habits route
    app.use('/habits', habits);

    // Use User routes
    app.use('/users', users);

    app.get('/', (req, res) => {
      res.send('Hello NODE API');
    });

    app.listen(5000, () => {
      console.log('Node API is running on port 5000');
    });
  } catch (error) {
    console.error('Error starting the server:', error);
  }
})();
