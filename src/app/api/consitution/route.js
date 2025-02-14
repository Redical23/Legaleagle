import dbConnect from "../../lib/dbConnect";
import constitution from "../../models/Consitutution";
import User from "../../models/User";
export async function GET(req) {
  await dbConnect();

  try {
    const news = await  constitution.find({});
    
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