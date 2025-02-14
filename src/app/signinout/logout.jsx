"use client";

import { signOut, useSession } from "next-auth/react";
import React from "react";

const Logout = () => {
  const { data: session } = useSession();

  if (!session) return null;

  return (
    <div>
      <h2>Welcome, {session.user?.name || session.user?.email}</h2>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
};

export default Logout;
