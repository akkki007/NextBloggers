import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost:27017/blogs")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  date: { type: Date, default: Date.now },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
