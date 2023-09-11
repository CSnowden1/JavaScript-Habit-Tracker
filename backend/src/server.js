const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Habits = require('./Models/habitModel');

// Middleware for parsing JSON
app.use(express.json());

// Routes
const habitsRoutes = require('./routes/habits'); // Corrected the path here

// Define routes before starting the server
app.use('/habits', habitsRoutes);

app.get('/', (req, res) => {
    res.send("Hello NODE API");
});

app.listen(5000, () => {
    console.log("Node API is running on port 5000");
});

mongoose
    .connect('mongodb+srv://ChiefTweet:94112103@snowdencluster.hjug07l.mongodb.net/User-Habits?retryWrites=true&w=majority')
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.log(error);
    });
