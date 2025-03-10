import { NextResponse } from "next/server";
import dbconnect from "../../lib/dbConnect";
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

// Define Mongoose schema
const PostSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },  // 🔹 Using UUID for custom ID
  name: { type: String, required: true }, 
  avatar: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String },
  company: { type: String, default: "Your Company" },
  position: { type: String, default: "New Internship" },
  location: { type: String, default: "To be specified" },
  postedAt: { type: Date, default: Date.now },
  companyLogo: { type: String },
  email: { type: String, required: true },
  likes: { type: Number, default: 0 },
  comments: { type: Number, default: 0 },
}, { timestamps: true });

const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);

// 🔄 Retry logic for duplicate error handling
async function createPostWithRetry(postData, retries = 3) {
  try {
    return await Post.create(postData);
  } catch (error) {
    if (error.code === 11000 && retries > 0) {
      console.log(`Retrying... Attempts left: ${retries - 1}`);
      postData.id = uuidv4(); // ✅ Generate new UUID for retries
      return createPostWithRetry(postData, retries - 1);
    } else {
      throw error;
    }
  }
}

// POST handler: Create a new post
export async function POST(req) {
  try {
    await dbconnect();

    const body = await req.json();
    const { id, name, avatar, description, link, location, email } = body;

    // 🚨 Input validation
    if (!description || !email || !name || !avatar) {
      return NextResponse.json(
        { success: false, message: "Required fields are missing" },
        { status: 400 }
      );
    }

    // ✅ Upsert to prevent duplicates
    const newPost = await Post.findOneAndUpdate(
      { id: id || uuidv4() }, // Use provided `id` or generate a new UUID
      {
        name,
        avatar,
        description,
        link,
        location: location || "To be specified",
        company: "Your Company",
        position: "New Internship",
        postedAt: new Date(),
        companyLogo:
          "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100",
        likes: 0,
        comments: 0,
        email,
      },
      { upsert: true, new: true }
    );

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




export async function DELETE(req) {
  await dbconnect();

  try {
    const { id } = await req.json();  // ✅ Expect `id` from the request body
    console.log("Delete request for:", id);

    if (!id) {
      return new Response(JSON.stringify({ error: "ID is required." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // ✅ Correct Deletion Using `id`
    const deletedPost = await Post.findOneAndDelete({ id });

    if (!deletedPost) {
      return new Response(JSON.stringify({ error: "Post not found." }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ message: "Post deleted successfully." }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error deleting post:", error);
    return new Response(JSON.stringify({ error: "Failed to delete post." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
