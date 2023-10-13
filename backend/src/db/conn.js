// db/conn.js
const mongoose = require('mongoose');

async function connectToDatabase() {
  try {
    const uri = process.env.MONGO_PROD_URI;
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    const client = await mongoose.connect(uri, options);
    console.log('Database connected!');
    
    const db = client.connection.db; // Get the database from the client
    return db;
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
}

module.exports = connectToDatabase;
