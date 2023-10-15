const express = require('express');
const { ObjectId } = require('mongodb');
const authDBConnection = require('../Middleware/authDBConnection.js');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../Models/userModel.js');
const Habit = require('../Models/habitModel.js');
console.log("Habit Model:", Habit);  // Added console.log for debugging

router.use(authDBConnection.connectToDbMiddleware);

// Get a list of all the records.
router.get("/", async (req, res) => {
  try {
    if (req.user) {
      // Fetch habits associated with the logged-in user
      const user = await User.findById(req.user.userId);
      console.log("User:", user);  // Added console.log for debugging
      res.status(200).send(user.habits);
    } else {
      res.status(500).send("No user found");  // Changed 'results' to a string
    }
  } catch (error) {
    console.error("Error fetching habits:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Get a single record by id
router.get("/:id", async (req, res) => {
  const collection = req.db.collection("habits");
  const query = { _id: new ObjectId(req.params.id) };
  const result = await collection.findOne(query);

  if (!result) {
    res.status(404).send("Not found");
  } else {
    res.status(200).send(result);
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, frequency, time, count, goal, image } = req.body;
    let habit;

    if (req.user) {
      // If logged in, associate habit with the user
      console.log("checking user");
      habit = new Habit({ user: req.user.username, name, frequency, time, count, goal, image });
      await habit.save();

      // Update user's habits array
      await User.findByIdAndUpdate(req.user.userId, { $push: { habits: habit } });
    } else {

      console.log("checking non-user");
      // For anonymous users, just create the habit
      habit = new Habit({ name, frequency, time, count, goal, image });
      await habit.save();
    }

    res.status(201).json(habit);
  } catch (error) {
    console.error("Error creating habit:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Update a record
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const collection = req.db.collection("habits");
    const query = { _id: new ObjectId(id) };

    const updates = {
      $set: {
        "habit name": req.body.name,
        "frequency": req.body.frequency,
        "time": req.body.time,
        "goal": req.body.goal,
        "image": req.body.image,
      },
    };

    const result = await collection.updateOne(query, updates);

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    // Fetch the updated habit
    const updatedHabit = await collection.findOne(query);
    console.log("Updated Habit:", updatedHabit);  // Added console.log for debugging

    return res.status(200).json(updatedHabit);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.patch("/:id/add", async (req, res) => {
  try {
    const { id } = req.params;
    const collection = req.db.collection("Habits");
    const query = { _id: new ObjectId(id) };

    // Increment the count property
    const updates = {
      $inc: { count: 1 },
    };

    const result = await collection.updateOne(query, updates);
    console.log("Add Result:", result);  // Added console.log for debugging

    return res.status(200).send(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.patch("/:id/minus", async (req, res) => {
  try {
    const { id } = req.params;
    const collection = req.db.collection("Habits");
    const query = { _id: new ObjectId(id) };

    // Decrement the count property
    const updates = {
      $inc: { count: -1 },
    };

    const result = await collection.updateOne(query, updates);
    console.log("Minus Result:", result);  // Added console.log for debugging

    return res.status(200).send(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const objectId = new ObjectId(id);
    const collection = req.db.collection("Habits");
    const query = { _id: objectId };

    const result = await collection.deleteOne(query);
    console.log("Delete Result:", result);  // Added console.log for debugging

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    return res.status(204).json({ message: 'Habit Deleted' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
