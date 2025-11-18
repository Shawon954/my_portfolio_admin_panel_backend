require('dotenv').config();
const mongoose = require('mongoose');

const DataBase_Connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
     console.log("✅ MongoDB Connected Successfully!");
  } catch (error) {
     console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

module.exports = DataBase_Connection;
