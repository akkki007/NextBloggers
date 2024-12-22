import mongoose from "mongoose";
import connectDB from "../lib/db";

// Ensure database connection is established
try {
  await connectDB();
} catch (error) {
  console.error("MongoDB connection error:", error);
}

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters long"],
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      trim: true,
      minlength: [10, "Content must be at least 10 characters long"],
    },
    date: {
      type: Date,
      default: Date.now,
      index: true, // Add index for date queries
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
      index: true, // Add index for user queries
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);
export default Blog;
