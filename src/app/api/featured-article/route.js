import dbConnect from "../../lib/dbConnect";
import News from "../../models/News";

export async function GET(req) {
  await dbConnect();

  try {
    // Querying the News collection to find an article with the 'featured' field set to true
    const featuredNews = await News.findOne({ Feature: true });

    // Log the result to confirm if the data is found
    console.log('Featured News:', featuredNews);

    if (!featuredNews) {
      // If no featured news is found, return a 404 response
      return new Response(JSON.stringify({ error: 'No featured article found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // If featured news is found, return the news data in the response
    return new Response(JSON.stringify(featuredNews), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    // In case of a database or other error, return a 500 status with an error message
    console.error('Error fetching featured news:', error); // Log the error for debugging
    return new Response(JSON.stringify({ error: 'Failed to fetch news' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
