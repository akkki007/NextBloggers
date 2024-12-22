import { NextResponse } from "next/server";
import Blog from "../../models/blogs";
import User from "../../models/user";

export async function POST(request) {
  try {
    // Parse and validate request body
    const { title, content, userId } = await request.json();
    console.log("Received blog data:", { title, content, userId });

    if (!title || !content || !userId) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Create blog with proper fields
    const blog = await Blog.create({
      title,
      content,
      userId: user._id, // Store userId instead of author
      date: new Date(),
    });

    // Update user's blogs array
    await User.findByIdAndUpdate(
      userId,
      { $push: { blogs: blog._id } },
      { new: true } // Return updated document
    );

    return NextResponse.json(
      {
        message: "Blog created successfully",
        blog: blog,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json(
      { message: "Failed to create blog", error: error.message },
      { status: 500 }
    );
  }
}
