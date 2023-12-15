// server.js
require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
const habits = require('./routes/habits.js');
const users = require('./routes/users.js');
const connectToDatabase = require('./db/conn.js');
const PORT = process.env.PORT || 5000;




app.use(cors({ origin: '*' }));

app.use(express.json());

(async () => {
  try {
    const db = await connectToDatabase();

    app.use((req, res, next) => {
      req.db = db;
      next();
    });

 
    if (process.env.NODE_ENV === 'production') {
      app.use(express.static(path.join(__dirname, '../../build')));
  
      app.get('*', (req, res) => {
          res.sendFile(path.resolve(__dirname, '../../build', 'index.html'));
      });
  }

    app.use('/users', users);

    app.get('/', (req, res) => {
      res.send('Hello NODE API');
    });

    app.listen(PORT, () => {
      console.log(`Node API is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
  }
})();
