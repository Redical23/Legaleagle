import { NextResponse } from "next/server";
import dbconnect from "../../lib/dbConnect";
import mongoose from "mongoose";

// Define a Mongoose schema
const PostSchema = new mongoose.Schema({
  name: { type: String, required: true }, // ✅ Added user's name
  avatar: { type: String, required: true }, // ✅ Added user's avatar
  description: { type: String, required: true },
  link: { type: String },
  company: { type: String, default: "Your Company" },
  position: { type: String, default: "New Internship" },
  location: { type: String, default: "To be specified" }, // ✅ Now stored properly
  postedAt: { type: Date, default: Date.now },
  companyLogo: { type: String },
  email: { type: String, required: true },
  likes: { type: Number, default: 0 },
  comments: { type: Number, default: 0 },
});

const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);

// POST handler: Create a new post
export async function POST(req) {
  try {
    await dbconnect();

    const body = await req.json();
    const { name, avatar, description, link, location, email } = body; // ✅ Extract all fields

    if (!description) {
      return NextResponse.json(
        { success: false, message: "Description is required" },
        { status: 400 }
      );
    }

    if (!email || !name || !avatar) {
      return NextResponse.json(
        { success: false, message: "User information is missing" },
        { status: 400 }
      );
    }

    const newPost = await Post.create({
      name, // ✅ Store user's name
      avatar, // ✅ Store user's avatar
      description,
      link,
      location: location || "To be specified", // ✅ Store location
      company: "Your Company",
      position: "New Internship",
      postedAt: new Date(),
      companyLogo:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100",
      likes: 0,
      comments: 0,
      email,
    });

    return NextResponse.json({
      success: true,
      message: "Post created successfully",
      data: newPost,
    });
  } catch (error) {
    console.error("❌ Error in POST /api/posts:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// GET handler: Fetch all posts
export async function GET() {
  try {
    await dbconnect();
    const posts = await Post.find({}).sort({ createdAt: -1 }); // Fetch & sort by latest

    console.log("📢 Retrieved posts:", posts); // Debugging line

    if (!posts.length) {
      return NextResponse.json({ success: false, message: "No posts found" });
    }

    return NextResponse.json({ success: true, data: posts });
  } catch (error) {
    console.error("❌ Error in GET /api/posts:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
