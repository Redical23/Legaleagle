"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    // Send POST request for registration
    const res = await fetch("/api/users", {
      method: "POST",  // Use POST instead of PUT for registration
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, username, password }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("User registered successfully! Redirecting...");
      setEmail("");
      setUsername("");
      setPassword("");
      setTimeout(() => {
        router.push("/auth/success");  // Redirect to success page
      }, 2000);
    } else {
      setMessage(data.message || "Something went wrong.");
    }
  };

  if (status === "authenticated") {
    router.push("/"); // Redirect authenticated users to home page
    return null; // Prevent rendering the page
  }

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {message && <p>{message}</p>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
