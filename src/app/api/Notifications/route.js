import { NextResponse } from "next/server";
import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";
 // Your user model

 export async function PUT(req) {
    try {
      const { email, notificationsEnabled } = await req.json();
  
      if (!email) {
        return NextResponse.json({ error: "Email is required" }, { status: 400 });
      }
  
      await connectToDB();
      const updatedUser = await User.findOneAndUpdate(
        { email }, 
        { notificationsEnabled },
        { new: true }
      );
  
      if (!updatedUser) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
  
      return NextResponse.json({ success: true, message: "Settings updated" });
    } catch (error) {
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }