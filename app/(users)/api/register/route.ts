import { NextResponse } from "next/server";
import { userModel } from "@/models/userModel";
import dbConnect from "@/lib/dbConnect";

export async function POST(request: Request) {
  await dbConnect();

  const { email, password, name } = await request.json();

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 },
      );
    }

    const user = new userModel({ email, password, name });
    await user.save();

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating user" },
      { status: 500 },
    );
  }
}
