
import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";

const jsonHeaders = { "Content-Type": "application/json" };

const jsonResponse = (data, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: jsonHeaders });

export async function GET(req) {
  try {
    await dbConnect();
    // Get page number and filter params from query parameters
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1; // Default to page 1 if not provided
    const usersPerPage = 9; // Adjust as needed
    
    // Pagination logic
    const skip = (page - 1) * usersPerPage;
    
    // Query the users with pagination
    const users = await User.find({})
      .skip(skip)
      .limit(usersPerPage)
      .select("name email  username title bio firm category location phone education barAdmissions areasOfPractice awards recentCases publications password bookmarks charge yearsexp subscribe avatar subscriptionExpiry resetPasswordToken notificationsEnabled resetPasswordExpires admin  islaywer"); // Limit the fields returned
    const totalUsers = await User.countDocuments({});

    // Return users with total count for pagination info
    return jsonResponse({
      users,
      totalPages: Math.ceil(totalUsers / usersPerPage),
      currentPage: page
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return jsonResponse({ error: "Failed to fetch users" }, 500);
  }
}
