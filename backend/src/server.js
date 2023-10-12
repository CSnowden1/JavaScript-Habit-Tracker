// server.js

const express = require('express');
const app = express();
const cors = require("cors");
const habits = require("./routes/habits.js");
const users = require("./routes/users.js");

require("./loadEnvironment.js");
const connectToDatabase = require("./db/conn.js");

// Middleware to enable CORS
app.use(cors({ origin: "*" }));


// Middleware to parse JSON requests
app.use(express.json());

// Use the habits route
app.use("/habits", habits);


// Use User routes
app.use("/users", users);


app.get('/', (req, res) => {
    res.send("Hello NODE API");
});

app.listen(5000, () => {
    console.log("Node API is running on port 5000");
});

// Connect to the database
connectToDatabase();
