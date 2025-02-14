"use client";

import { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const res = await fetch("/api/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    setIsLoading(false);
    setMessage(data.message);
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-bold text-center text-blue-600">
          Forgot Password
        </h2>
        <p className="text-sm text-gray-500 text-center mb-4">
          Enter your email and we'll send you a reset link.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md focus:border-blue-500 focus:ring-1"
          />
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {message && <p className="mt-2 text-center text-sm text-green-600">{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
