const connectToDatabase = require("../db/conn.js");



// Middleware to connect to the database
 async function connectToDbMiddleware(req, res, next) {
  try {
    const db = await connectToDatabase();
    req.db = db; // Attach the database connection to the request object
    next(); // Continue processing the request
  } catch (error) {
    console.error("Error connecting to the database:", error);
    res.status(500).send("Internal Server Error");
  }
}


module.exports = connectToDbMiddleware;  