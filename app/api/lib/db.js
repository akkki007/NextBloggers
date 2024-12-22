// app/api/lib/db.js
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      return;
    }
    await mongoose.connect(
      "mongodb+srv://akki3:akshay1234@blogging-website.q0rsg.mongodb.net/?retryWrites=true&w=majority&appName=Blogging-Website"
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

export default connectDB;
