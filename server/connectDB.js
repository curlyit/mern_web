require("dotenv").config();
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern.oprxna2.mongodb.net/MERN?retryWrites=true&w=majority`
    );
    console.log("connected Database");
  } catch (error) {
    console.log("error Database");
    process.exit(1);
  }
};
module.exports = connectDB;
