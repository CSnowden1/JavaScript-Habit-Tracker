const express = require('express');
const connectToDbMiddleware = require('../Middleware/databaseConnection.js');
const { ObjectId } = require('mongodb');


const router = express.Router();

// Middleware to connect to the database

// Use the connectToDbMiddleware for all routes in this file
router.use(connectToDbMiddleware);


// Get a list of all the records.
router.get("/", async (req, res) => {
    const collection = req.db.collection("users");
    const results = await collection.find({}).toArray();
    res.status(200).send(results);
  });


  router.post("/", async (req, res) => {
    try {
      const newDocument = {
        "first name": req.body['first name'],
        "last name": req.body['last name'],
        "username": req.body.username,
        "password": req.body.password,
      };
  
      const collection = req.db.collection("users");
      const result = await collection.insertOne(newDocument);
      res.status(204).send(result);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).send("Internal Server Error");
    }
  });


router.get("/", async (req, res) => {
    try {
        const collection = req.db.collection("users");
        const results = await collection.find({}).toArray();
        res.status(200).send(results);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send("Internal Server Error");
    }
});




router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const objectId = new ObjectId(id);
      const collection = req.db.collection("users");
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
