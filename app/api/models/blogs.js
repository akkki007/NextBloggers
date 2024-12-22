// app/api/models/blogs.js
import mongoose from "mongoose";
import connectDB from "../lib/db";

// Ensure database connection
connectDB();

const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  date: { type: Date, default: Date.now },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);
export default Blog;
