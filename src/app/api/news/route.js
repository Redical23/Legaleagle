import dbConnect from "../../lib/dbConnect";
import News from "../../models/News";

export async function GET(req) {
  await dbConnect();

  try {
    const news = await News.find({});
    
    return new Response(JSON.stringify(news), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch news' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}