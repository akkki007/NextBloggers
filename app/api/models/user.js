// app/api/models/user.js
import mongoose from "mongoose";
import connectDB from "../lib/db";

// Ensure database connection is established
try {
  await connectDB();
} catch (error) {
  console.error("MongoDB connection error:", error);
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password should be at least 6 characters"],
  },
  token: {
    type: String,
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
