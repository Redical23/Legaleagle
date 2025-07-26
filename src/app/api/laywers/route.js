import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";

const jsonHeaders = { "Content-Type": "application/json" };

const jsonResponse = (data, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: jsonHeaders });

export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);

    const onlyNames = searchParams.get("onlyNames") === "true";
    const username = searchParams.get("username");

    // ✅ Filtered: only lawyers, return limited fields
    if (onlyNames) {
      const users = await User.find(
        { islaywer: true },
        "name avatar charge yearsexp areasOfPractice location"
      ).limit(100);
      return jsonResponse({ users });
    }

    // ✅ Full details of one user (optional)
    if (username) {
      const user = await User.findOne({ name: username });
      if (!user) return jsonResponse({ error: "User not found" }, 404);
      return jsonResponse({ user });
    }

    // ✅ Full paginated response (not used in Home now)
    const page = parseInt(searchParams.get("page")) || 1;
    const usersPerPage = 9;
    const skip = (page - 1) * usersPerPage;

    const users = await User.find({ islaywer: true })
      .skip(skip)
      .limit(usersPerPage)
      .select("name email username title bio firm category location phone education barAdmissions areasOfPractice awards recentCases publications password bookmarks charge yearsexp subscribe avatar subscriptionExpiry resetPasswordToken notificationsEnabled resetPasswordExpires admin islaywer");

    const totalUsers = await User.countDocuments({ islaywer: true });

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
