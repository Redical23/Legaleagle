import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";
import crypto from "crypto";
import sendEmail from "../../utils/sendEmail";

export async function POST(req) {
  try {
    await dbConnect();
    const { email } = await req.json();

    if (!email) {
      return new Response(JSON.stringify({ message: "Email is required" }), { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
    }

    // Generate reset token and expiry
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour expiry
    await user.save();

    // Send email with reset link
    const resetURL = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`;
    await sendEmail(user.email, "Password Reset Request", `Click here to reset your password: ${resetURL}`);

    return new Response(JSON.stringify({ message: "Password reset link sent to your email!" }), { status: 200 });
  } catch (error) {
    console.error("Error in password reset:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
  }
}
