const mongoose = require("mongoose");
const colors = require("colors");
const connectDb = async () => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(process.env.DB_URL);
    console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDb;
