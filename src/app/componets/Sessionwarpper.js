// components/SessionWrapper.js
"use client";
import { SessionProvider } from "next-auth/react";
import { ModelProvider } from "../context/Context";

const Sessionwarpper = ({ children }) => {
  return (
    <SessionProvider>
      <ModelProvider>
        {children}
      </ModelProvider>
    </SessionProvider>
  );
};

export default Sessionwarpper;

