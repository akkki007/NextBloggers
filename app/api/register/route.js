import { NextResponse } from "next/server";
import User from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import connectDB from "../lib/db"; // Import the database connection function

export async function POST(request) {
  try {
    await connectDB(); // Ensure database connection before proceeding
    const { name, email, password } = await request.json();
    const token = jwt.sign({ email }, "secret", { expiresIn: "7D" });
    console.log(name);

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        token,
      });
      const response = NextResponse.json(
        { message: "User created successfully", user },
        { status: 201 }
      );
      response.cookies.set("Userrr", token);
      return response;
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
