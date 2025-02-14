import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";

export async function PATCH(req) {
  await dbConnect();
  const bcrypt = (await import("bcryptjs")).default;

  try {
    // Extract data from request
    const { id, name, title, avatar, bio, firm, location, phone, email, education, barAdmissions, areasOfPractice, awards, password, currentPassword, charge, yearsexp } = await req.json();
    console.log("Received form data:", { id, name, title, avatar, bio, firm, location, phone, email, education, barAdmissions, areasOfPractice, awards, password, charge, yearsexp });

    if (!email) {
      return new Response(JSON.stringify({ error: "Email is required." }), { status: 400, headers: { "Content-Type": "application/json" } });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found." }), { status: 404, headers: { "Content-Type": "application/json" } });
    }

    // Only update fields if provided
    user.name = name || user.name;
    user.title = title || user.title;
    user.avatar = avatar || user.avatar;
    user.bio = bio || user.bio;
    user.firm = firm || user.firm;
    user.location = location || user.location;
    user.phone = phone || user.phone;
    user.email = email || user.email;
    user.charge = charge !== undefined ? charge : user.charge;
    user.yearsexp = yearsexp !== undefined ? yearsexp : user.yearsexp;

    if (education && education !== "[]") {
      const parsedEducation = JSON.parse(education);
      if (parsedEducation.some((item) => item.degree !== "" || item.institution !== "" || item.year !== "")) {
        user.education = parsedEducation;
      }
    }

    user.barAdmissions = barAdmissions && barAdmissions !== "[]" ? JSON.parse(barAdmissions) : user.barAdmissions;
    user.areasOfPractice = areasOfPractice && areasOfPractice !== "[]" ? JSON.parse(areasOfPractice) : user.areasOfPractice;
    user.awards = awards && awards !== "[]" ? JSON.parse(awards) : user.awards;

    // 🔥 Require current password before changing password
    if (password) {
      if (!currentPassword) {
        return new Response(JSON.stringify({ error: "Current password is required." }), { status: 400, headers: { "Content-Type": "application/json" } });
      }

      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return new Response(JSON.stringify({ error: "Current password is incorrect." }), { status: 401, headers: { "Content-Type": "application/json" } });
      }

      user.password = await bcrypt.hash(password, 10);
    }

    // Save updated user
    await user.save();

    return new Response(JSON.stringify({ message: "User details updated successfully." }), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (error) {
    console.error("Error updating user details:", error);
    return new Response(JSON.stringify({ error: "Failed to update user details." }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}




export async function DELETE(req) {
  await dbConnect();

  try {
    const { email } = await req.json();
    console.log("Delete request for:", email);

    if (!email) {
      return new Response(JSON.stringify({ error: "Email is required." }), { 
        status: 400, headers: { "Content-Type": "application/json" } 
      });
    }

    // Find and delete the user
    const deletedUser = await User.findOneAndDelete({ email });

    if (!deletedUser) {
      return new Response(JSON.stringify({ error: "User not found." }), { 
        status: 404, headers: { "Content-Type": "application/json" } 
      });
    }

    return new Response(JSON.stringify({ message: "Account deleted successfully." }), { 
      status: 200, headers: { "Content-Type": "application/json" } 
    });
  } catch (error) {
    console.error("Error deleting account:", error);
    return new Response(JSON.stringify({ error: "Failed to delete account." }), { 
      status: 500, headers: { "Content-Type": "application/json" } 
    });
  }
}
