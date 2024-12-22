import { NextResponse } from "next/server";
import User from "../../models/user";

export async function GET(request, { params }) {
  try {
    const user = await User.findById(params.userId);
    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}

// Add blog to user
export async function POST(request, { params }) {
  try {
    const body = await request.json();
    const user = await User.findById(params.userId);

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    user.blogs.push({
      title: body.title,
      content: body.content,
      date: new Date(),
    });

    await user.save();

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to add blog" },
      { status: 500 }
    );
  }
}
