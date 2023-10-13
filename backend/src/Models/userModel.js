const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
});

// Middleware to hash the password before saving
userSchema.pre('save', async function (next) {
    const user = this;
  
    // Only hash the password if it's been modified (or is new)
    if (!user.isModified('password')) return next();
  
    try {
      // Generate a salt
      const salt = await bcrypt.genSalt(10);
  
      // Hash the password using the generated salt
      const hash = await bcrypt.hash(user.password, salt);
  
      // Replace the plaintext password with the hash
      user.password = hash;
      next();
    } catch (error) {
      console.error('Error hashing password:', error);
      next(error); // Call next with the error to continue the flow
    }
  });

// Method to compare a plaintext password with the hashed password
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

const User = mongoose.model('user', userSchema);

module.exports = User;
