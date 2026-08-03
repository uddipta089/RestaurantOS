const mongoose = require('mongoose');
const winston = require('winston'); // Assuming winston is used for logging as per instructions

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      // These options are mostly defaults in newer mongoose versions, but good practice to include
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
