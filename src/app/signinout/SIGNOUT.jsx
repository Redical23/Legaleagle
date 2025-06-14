"use client";

import React from "react";
import { useSession, signOut } from "next-auth/react";

const Page = () => {
  const { data: session, status } = useSession();

  // If the session is loading, show loading text
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  // If the user is not signed in, don't render anything related to sign-in or sign-out
  if (!session) {
    return null; // or render a message if needed, like "You are not signed in."
  }

  return (
    <div>
      <button
        onClick={() =>
          signOut({ callbackUrl: "https://www.kanoonikarwayahi.com/" })
        }
        className="bg-red-500 text-white px-4 py-2 rounded-md"
      >
        Sign out
      </button>
    </div>
  );
};

export default Page;
