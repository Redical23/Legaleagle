import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import dbconnect from "../../../lib/dbConnect";
import User from "../../../models/User";

const handler = NextAuth({
  providers: [
    // Google Authentication  
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),

    // Email & Password Authentication
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await dbconnect();
        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          throw new Error("User not found");
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        return { id: user._id, email: user.email, name: user.username };
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      await dbconnect();

      if (account.provider === "google") {
        let existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          existingUser = new User({
            email: user.email,
            username: user.name || user.email.split("@")[0], // Default username
            password: null, // No password for OAuth users
          });
          await existingUser.save();
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
  },

  session: {
    strategy: "jwt",
  },

 

});

export { handler as GET, handler as POST };
