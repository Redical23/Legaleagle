"use client";
import React, { createContext, useEffect, useState, useContext } from "react";

export const ModelOpenContext = createContext({});

export const ModelProvider = ({ children }) => {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [updateAvtarURL, setupdateAvtarURL] = useState("");
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [istimes, setistimes] = useState(false);
  const [searchterm, setsearchterm] = useState("");
  const [email, setEmail] = useState("");
  const [clientemail, setclientemail] = useState("");
  const [currentchat, setcurrentchat] = useState("");

  const [user, setUser] = useState(null); // ✅ new: user object

  // Load email from localStorage on mount
  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) setEmail(storedEmail);
  }, []);

  // Fetch user only once when email is available
  useEffect(() => {
    const fetchUser = async () => {
      if (!email) return;
      try {
        const res = await fetch(`/api/users?email=${email}`);
        const data = await res.json();
        if (res.ok) setUser(data);
        else console.error("User fetch failed:", data.error);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchUser();
  }, [email]);

  // Update localStorage + email state
  const updateEmail = (newEmail) => {
    setEmail(newEmail);
    localStorage.setItem("userEmail", newEmail);
  };

  return (
    <ModelOpenContext.Provider
      value={{
        isModelOpen,
        setIsModelOpen,
        updateAvtarURL,
        setupdateAvtarURL,
        isSignedUp,
        setIsSignedUp,
        searchterm,
        setsearchterm,
        istimes,
        setistimes,
        email,
        setEmail: updateEmail,
        clientemail,
        setclientemail,
        currentchat,
        setcurrentchat,
        user,        // ✅ now available anywhere
        setUser,
      }}
    >
      {children}
    </ModelOpenContext.Provider>
  );
};

export const useModelContext = () => useContext(ModelOpenContext);
