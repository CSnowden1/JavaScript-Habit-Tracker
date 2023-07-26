const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
uri = 'mongodb+srv://ChiefTweet:Spiderman9411@snowdencluster.hjug07l.mongodb.net/habittrackerapp?retryWrites=true&w=majority'
console.log(uri);



const connectDB = async () => {
    try {
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

        console.log(`MongoDB Connected: ${client.connection}`.cyan.underline);


    } catch (error) {
        console.log(error);
        process.exit(1);

    }
};


module.exports = connectDB;


