import dbConnect from "../../lib/dbConnect";
import News from "../../models/News";
import { ObjectId } from 'mongodb';

export async function GET(req) {
  await dbConnect();

  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  const category = url.searchParams.get("category");
  const excludeId = url.searchParams.get("excludeId");

  try {
    let news;

    // ✅ Handle invalid ObjectId format
    if (id && !ObjectId.isValid(id)) {
      return new Response(JSON.stringify({ error: "Invalid ID format" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // ✅ Fetch a single news article by ID
    if (id) {
      news = await News.findOne({ _id: new ObjectId(id) });

      if (!news) {
        return new Response(JSON.stringify({ error: "News not found" }), {
          status: 404,
          headers: { "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify(news), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // ✅ Fetch related news articles
    if (category) {
      news = await News.find({
        category,
        _id: { $ne: new ObjectId(excludeId) },
        feature: { $ne: true },
      }).limit(2);

      return new Response(JSON.stringify(news), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // ✅ Default: Fetch all news
    news = await News.find({});
    return new Response(JSON.stringify(news), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error fetching data:", error);
    return new Response(JSON.stringify({ error: 'Failed to fetch news' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
