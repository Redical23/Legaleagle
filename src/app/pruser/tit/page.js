"use client"
import React from 'react'
import { useState, useEffect } from 'react';
import { useModelContext } from '../context/Context';
const Createpost = () => {
  const [error, setError] = useState(null);
  const {  email } = useModelContext(); // Get email from Context
  const [user, setUser] = useState(null);
  const decodedEmail = email ? decodeURIComponent(email) : null;
  useEffect(() => {
    // Fetch user data by email
    const fetchUserData = async () => {
      try {
        const res = await fetch(`/api/users?email=${decodedEmail}`);
        const data = await res.json();

        if (res.ok) {
          setUser(data); // Store the user data in the state
        } else {
          setError(data.error); // Handle errors
        }
      } catch (error) {
        setError("Failed to fetch user data");
      }
    };

    if (email) {
      fetchUserData(); // Fetch user data when email is available
    }
  }, [email]);
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      
    </div>
  )
}

export default Createpost