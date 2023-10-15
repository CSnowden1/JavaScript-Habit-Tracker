const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema({
  // Add a reference to the User model
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  frequency: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  goal: {
    type: Number,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
});

const Habit = mongoose.model("habit", habitSchema);
console.log("Habit model created successfully!");


module.exports = {
  Habit,
  habitSchema,
};