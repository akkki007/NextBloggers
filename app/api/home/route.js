import { NextResponse } from "next/server";
import Blog from "../models/blogs";
import User from "../models/user";
import connectDB from "../lib/db";

export async function GET(request) {
  try {
    await connectDB();
    const blogs = await Blog.find({}).populate("userId", "name");
    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { message: "Unexpected error occurred" },
      { status: 500 }
    );
  }
}