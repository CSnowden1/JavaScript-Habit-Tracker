const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport'); // Import Passport
const LocalStrategy = require('passport-local').Strategy;
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

// Passport initialization
passport.use(
  new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, false, { message: 'Invalid credentials.' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return done(null, false, { message: 'Invalid credentials.' });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

router.use(passport.initialize());
router.use(passport.session());

router.post('/register', async (req, res) => {
  // ... (your registration logic)
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      return res.json({ token });
    });
  })(req, res, next);
});

module.exports = {
  router,
  connectToDbMiddleware,
};
