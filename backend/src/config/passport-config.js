// passport-config.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../Models/userModel');



passport.use(new LocalStrategy(
  { usernameField: 'username' },
  async (username, password, done) => {
    try {
        const collection = req.db.collection('users');
      const user = await collection.findOne({ username });

      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
