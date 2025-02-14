import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";
import bcrypt from "bcryptjs";


export async function POST(req) {
  try {
    await dbConnect();
    const { token, password } = await req.json();
console.log(token,password)
    if (!token || !password) {
      return new Response(
        JSON.stringify({ message: "Token and password are required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Find user by token and ensure it's not expired
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    console.log(Date.now())
    console.log("User found:", user); // Debugging

    if (!user) {
      return new Response(
        JSON.stringify({ message: "Invalid or expired token." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Clear reset token and expiration
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    return new Response(
      JSON.stringify({ message: "Password reset successfully!" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error in reset-password API:", error);
    return new Response(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
