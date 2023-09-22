const express = require('express');
const { ObjectId } = require('mongodb');
const { client } = require('../db/conn.js');




const router = express.Router();

// Get a list of all the records.
router.get("/", async (req, res) => {
  const collection = client.db("User-Habits").collection("habits");
  const results = await collection.find({}).toArray();
  res.status(200).send(results);
});

// Get a single record by id
router.get("/:id", async (req, res) => {
  const collection = client.db("User-Habits").collection("habits");
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
    "id": req.body.id,
    "habit name": req.body.name, 
    "frequency": req.body.frequency, 
    "time": req.body.time,
    "count": req.body.count,
    "goal": req.body.goal,
    "image": req.body.image,
  };
  const collection = client.db("User-Habits").collection("habits");
  const result = await collection.insertOne(newDocument);
  res.status(204).send(result);
});

// Update a record by id
router.patch("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const updates = {
    $set: {
      "habit name": req.body.name, 
      "frequency": req.body.frequency, 
      "time": req.body.time,
      "count": req.body.count,
      "goal": req.body.goal,
      "image": req.body.image,
    }
  };

  const collection = client.db("User-Habits").collection("habits");
  const result = await collection.updateOne(query, updates);

  res.status(200).send(result);
});

// Delete a record
router.delete("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const collection = client.db("User-Habits").collection("habits");
  const result = await collection.deleteOne(query);

  res.status(200).send(result);
});

module.exports = router;
