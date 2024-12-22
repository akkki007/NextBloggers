// app/api/lib/db.js
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      return;
    }
    const MONGODB_URI = process.env.MONGODB_URI;
    await mongoose.connect(
      "mongodb+srv://akki3:akshay1234@blogging-website.q0rsg.mongodb.net/?retryWrites=true&w=majority&appName=Blogging-Website",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

export default connectDB;
