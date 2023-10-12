const express = require('express');
const { ObjectId } = require('mongodb');
const connectToDbMiddleware = require('../Middleware/databaseConnection.js');

const router = express.Router();





router.use(connectToDbMiddleware);
// Get a list of all the records.
router.get("/", async (req, res) => {
  const collection = req.db.collection("habits");
  const results = await collection.find({}).toArray();
  res.status(200).send(results);
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

// Create a new record
router.post("/", async (req, res) => {
  const newDocument = {
    "uuid": req.body.uuid,
    "habit name": req.body.name, 
    "frequency": req.body.frequency, 
    "time": req.body.time,
    "count": req.body.count,
    "goal": req.body.goal,
    "image": req.body.image,
  };
  const collection = req.db.collection("habits");
  const result = await collection.insertOne(newDocument);
  res.status(204).send(result);
});

router.patch("/:uuid", async (req, res) => {
  try {
    const { uuid } = req.params;
    const collection = req.db.collection("habits");
    const query = { uuid: uuid };

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

    return res.status(200).send(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.patch("/:id/add", async (req, res) => {
  try {
    const { id } = req.params; // Change from uuid to id
    const collection = req.db.collection("habits");
    const query = { _id: new ObjectId(id) }; // Change from uuid to _id

    // Increment the count property
    const updates = {
      $inc: { count: 1 },
    };

    const result = await collection.updateOne(query, updates);

    return res.status(200).send(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.patch("/:id/minus", async (req, res) => {
  try {
    const { id } = req.params; // Change from uuid to id
    const collection = req.db.collection("habits");
    const query = { _id: new ObjectId(id) }; // Change from uuid to _id

    // Decrement the count property
    const updates = {
      $inc: { count: -1 },
    };

    const result = await collection.updateOne(query, updates);

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
    const collection = req.db.collection("habits");
    const query = { _id: objectId };

    const result = await collection.deleteOne(query);

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
