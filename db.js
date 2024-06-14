const mongoose = require('mongoose');
require('dotenv').config();

// Define the MongoDb connention URL

// const mongoURL = process.env.MONGODB_URL_LOCAL  // Replace 'mydatabase' with your database name
const mongoURL = process.env.MONGODB_URL;

// set up MongoDB connection

mongoose.connect(mongoURL);



// Get the  default connection
// Mongoose maintains a  default connection object represting the MongoDB connetion.

const db = mongoose.connection;


// Define event listeners for database connection

db.on('connected', () => {
  console.log('Connected to MongoDB server');
});


db.on('error', (err) => {
  console.log('MongoDB connection error:', err);
});

db.on('disconnected', () => {
  console.log('MongoDB server discoonected');
});



// Export the database connection

module.exports = db;

