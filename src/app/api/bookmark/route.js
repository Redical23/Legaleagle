import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";

export async function POST(req) {
  await dbConnect();

  try {
    // Extract data from the request body
    const { email, newsId } = await req.json();
    console.log("Received bookmark data:", { email, newsId });

    // Check if email and newsId are provided
    if (!email || !newsId) {
      return new Response(
        JSON.stringify({ error: "Missing required fields." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      // If user doesn't exist, create a new user document with the bookmark
      await User.create({ email, bookmarks: [newsId] });
      return new Response(
        JSON.stringify({ message: "Bookmarked successfully." }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } else {
      // Add newsId to bookmarks if not already present
      if (!user.bookmarks.includes(newsId)) {
        user.bookmarks.push(newsId);
        await user.save();
      }
      return new Response(
        JSON.stringify({ message: "Bookmarked successfully." }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    console.error("Error bookmarking article:", error);
    return new Response(
      JSON.stringify({ error: "Failed to bookmark article." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}


import News from "../../models/News";

export async function GET(req) {
  await dbConnect();

  try {
    const { searchParams } = new URL(req.url);
    const ids = searchParams.get("ids")?.split(",") || [];

    let news;
    if (ids.length > 0) {
      console.log("📢 Fetching news for IDs:", ids);
      news = await News.find({ _id: { $in: ids } }); // Fetch only matching IDs
    } else {
      news = await News.find({});
    }

    return new Response(JSON.stringify(news), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("❌ Error fetching news:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch news" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

