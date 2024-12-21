import mongoose, { mongo } from "mongoose";

mongoose
  .connect("mongodb://localhost:27017/blogs")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  token: String,
  blogs: {
    type: [
      {
        title: String,
        content: String,
        date: { type: Date, default: Date.now },
      },
    ],
    default: [],
  },
});

const User = mongoose.model("User", userSchema);
export default User;
