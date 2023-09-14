// server.js

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Habits = require('./Models/habitModel')

// routes

const habitRoutes = require('./routes/habits');




app.use(express.json);


app.get('/', (req, res) => {
    res.send("Hello NODE API")
})

app.get('/habits', (req, res) => {
    res.send("This is the habit data")
  })

app.post('/habits', async(req, res) => {
    try {
        const habit = await Habits.create(req.body)
        res.status(200).json(habit)
    } catch(error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }

})


app.listen(5000, () => {
    console.log("Node API is runnning on port 5000")
})

mongoose.
connect('mongodb+srv://ChiefTweet:94112103@snowdencluster.hjug07l.mongodb.net/User-Habits?retryWrites=true&w=majority')
.then(() => {
    console.log("connected to Mongoose")
}).catch((error) => {
    console.log(error)
})


