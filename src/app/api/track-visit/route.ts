import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

export async function POST(request) {
  let client;

  try {
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Extract visitor's IP correctly
    const forwardedFor = request.headers.get("x-forwarded-for");
    const visitorIp = forwardedFor ? forwardedFor.split(",")[0].trim() : request.ip || "unknown";

    // Connect to MongoDB
    client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const db = client.db();

    await db.collection("visits").insertOne({
      userId: new ObjectId(userId),
      visitorIp,
      timestamp: new Date(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error tracking visit:", error);
    return NextResponse.json({ error: "Failed to track visit" }, { status: 500 });
  } finally {
    if (client) {
      await client.close();
    }
  }
}

export async function GET(request) {
  let client;

  try {
    const url = new URL(request.url);
    const email = url.searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const db = client.db();

    const now = new Date();
    const oneDayAgo = new Date(now);
    oneDayAgo.setDate(now.getDate() - 1);

    const oneWeekAgo = new Date(now);
    oneWeekAgo.setDate(now.getDate() - 7);

    const oneMonthAgo = new Date(now);
    oneMonthAgo.setMonth(now.getMonth() - 1);

    // Fetch visit stats for the specific email
    const visitStats = await db.collection("visits").aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userInfo",
        },
      },
      { $unwind: "$userInfo" },
      { $match: { "userInfo.email": email } }, // Filter by email
      {
        $group: {
          _id: "$userInfo._id",
          totalVisits: { $sum: 1 },
          monthlyVisits: { $sum: { $cond: [{ $gte: ["$timestamp", oneMonthAgo] }, 1, 0] } },
          weeklyVisits: { $sum: { $cond: [{ $gte: ["$timestamp", oneWeekAgo] }, 1, 0] } },
          dailyVisits: { $sum: { $cond: [{ $gte: ["$timestamp", oneDayAgo] }, 1, 0] } },
          lastVisit: { $max: "$timestamp" },
        },
      },
    ]).toArray();

    await client.close();

    if (visitStats.length === 0) {
      return NextResponse.json({ error: "No visit data found" }, { status: 404 });
    }

    return NextResponse.json(visitStats[0]);
  } catch (error) {
    console.error("Error fetching visit stats:", error);
    return NextResponse.json({ error: "Failed to fetch visit stats" }, { status: 500 });
  } finally {
    if (client) {
      await client.close();
    }
  }
}
