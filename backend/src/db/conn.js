const { MongoClient } = require("mongodb");

const connectionString = 'mongodb+srv://ChiefTweet:94112103@snowdencluster.hjug07l.mongodb.net';
const dbName = 'User-Habits'; // Replace with your actual database name

const client = new MongoClient(connectionString);

// Wrap the code in an async function
async function connectToDatabase() {
  let conn;
  try {
    conn = await client.connect();
    console.log('Connected to database');
  } catch (e) {
    console.error(e);
  }

  let db = conn.db(dbName); // Use the correct database name here

  return db;
}

// Export the async function
module.exports = connectToDatabase;
