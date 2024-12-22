// route.js
import { NextResponse } from "next/server";
import User from "../../models/user";
import Blog from "../../models/blogs";
import connectDB from "../../lib/db";

export async function POST(request) {
  try {
    await connectDB();

    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    // First find the user
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Find all blogs that belong to this user
    const blogs = await Blog.find({ userId: userId });

    console.log("Found blogs:", blogs);

    if (!blogs || blogs.length === 0) {
      return NextResponse.json(
        { message: "No blogs found for this user" },
        { status: 404 }
      );
    }

    return NextResponse.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { message: error.message || "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}
