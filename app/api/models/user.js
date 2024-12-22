// app/api/models/user.js
import mongoose from "mongoose";
import connectDB from "../lib/db";

// Ensure database connection
await connectDB();

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  token: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
