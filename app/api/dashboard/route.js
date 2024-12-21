// app/api/dashboard/route.js
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import User from "../models/user";

export async function GET(request) {
  const cookieStore = cookies();
  const token = cookieStore.get("Userrr");

  if (!token) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const verification = jwt.verify(token.value, "secret");
    const user = await User.findOne({ email: verification.email });
    console.log(user);

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error verifying token:", error);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
