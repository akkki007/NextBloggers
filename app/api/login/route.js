import { NextResponse } from "next/server";
import User from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    try {
      const pass = await bcrypt.compare(password, user.password);
      if (!pass) {
        return NextResponse.json(
          { message: "Invalid password" },
          { status: 401 }
        );
      }
    } catch (error) {
      console.error("Error comparing passwords:", error);
      return NextResponse.json(
        { message: "Unexpected error occurred" },
        { status: 500 }
      );
    }

    const token = jwt.sign({ email: user.email }, "secret", {
      expiresIn: "7D",
    });
    const response = NextResponse.json(
      { message: "Login successful", user, redirect: "/dashboard" },
      { status: 200 }
    );
    response.cookies.set("Userrr", token);

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Unexpected error occurred" },
      { status: 500 }
    );
  }
}
