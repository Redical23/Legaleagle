import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Sample data (Replace with database query)
    const insightsData = {
      totalVisits: 120,
      uniqueVisitors: 80,
      visitHistory: [
        { date: "2024-02-01", visits: 10 },
        { date: "2024-02-02", visits: 20 },
        { date: "2024-02-03", visits: 30 },
        { date: "2024-02-04", visits: 25 },
        { date: "2024-02-05", visits: 35 },
      ],
    };

    return NextResponse.json(insightsData, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch insights" }, { status: 500 });
  }
}
