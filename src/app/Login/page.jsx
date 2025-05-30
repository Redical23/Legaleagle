"use client";

import { useState } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { Apple, Facebook } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LoginPage() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
 
   const loge2 = "/c1.png"

  const handleInputChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        ...credentials,
        redirect: false,
      });

      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("Login successful!");
        router.push(`/pruser/${credentials.email}`);
      }   
    } catch (error) {
      toast.error("An error occurred during login.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Section */}
      <div className="relative hidden w-1/2 lg:block">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-blue-500/10">
          <Image
            src= {loge2} // Provide a valid image source here
            alt="Traveler overlooking mountains"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 p-8">
          <h1 className="text-2xl font-semibold text-white">Kanoonikarwayahi</h1>
          
        </div>
      </div>

      {/* Right Section */}
      <div className="flex w-full flex-col justify-center px-4 lg:w-1/2 lg:px-8">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-[#00A3FF]">Welcome</h2>
            <p className="text-sm text-gray-500">Login to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                value={credentials.email}
                onChange={handleInputChange}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-[#00A3FF] focus:outline-none focus:ring-1 focus:ring-[#00A3FF]"
              />
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={credentials.password}
                onChange={handleInputChange}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-[#00A3FF] focus:outline-none focus:ring-1 focus:ring-[#00A3FF]"
              />
              <button
                type="button"
                onClick={() => router.push("/forgot-password")}
                className="block text-right text-sm text-[#00A3FF] hover:underline"
              >
                Forgot your password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-md bg-[#00A3FF] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0088DD] focus:outline-none focus:ring-2 focus:ring-[#00A3FF] focus:ring-offset-2 disabled:opacity-50"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="mx-4 text-sm text-gray-500">OR</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => signIn("google", { callbackUrl: "/pruser/homepage" })}
              className="flex items-center justify-center rounded-md border border-gray-300 bg-white p-2 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#00A3FF] focus:ring-offset-2"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
            </button>
          </div>

          {/* Register */}
          <div className="mt-8 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <button onClick={() => router.push("/Register")} className="text-[#00A3FF] hover:underline">
              Register now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
