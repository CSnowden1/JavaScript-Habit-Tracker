const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema({
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

const Habit = mongoose.model("Habit", habitSchema);

module.exports = Habit;
