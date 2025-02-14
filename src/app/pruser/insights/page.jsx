"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useModelContext } from "../../context/Context";

export default function LawyerProfilePage() {
  const { email } = useModelContext(); // Get email from Context
  const [user, setUser] = useState(null);
  const [visitStats, setVisitStats] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  const decodedEmail = email ? decodeURIComponent(email) : null;

  useEffect(() => {
    if (!decodedEmail) return;

    // Fetch user data
    const fetchUserData = async () => {
      try {
        const res = await fetch(`/api/users?email=${decodedEmail}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        } else {
          setError(data.error);
        }
      } catch (error) {
        setError("Failed to fetch user data");
      }
    };

    // Fetch visit insights
    const fetchVisitStats = async () => {
      try {
        const res = await fetch(`/api/track-visit?email=${decodedEmail}`);
        const data = await res.json();
        if (res.ok) {
          setVisitStats(data);
        } else {
          setError(data.error);
        }
      } catch (error) {
        setError("Failed to fetch visit insights");
      }
    };

    fetchUserData();
    fetchVisitStats();
  }, [decodedEmail]);

  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>Loading...</div>;

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Lawyer Profile</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      
      <h2 className="text-2xl font-semibold mt-6">Profile Insights</h2>
      {visitStats ? (
        <div>
          <p><strong>Total Visits:</strong> {visitStats.totalVisits / 2}</p>
          <p><strong>Monthly Visits:</strong> {visitStats.monthlyVisits / 2}</p>
          <p><strong>Weekly Visits:</strong> {visitStats.weeklyVisits / 2}</p>
          <p><strong>Daily Visits:</strong> {visitStats.dailyVisits / 2}</p>
          <p><strong>Last Visit:</strong> {new Date(visitStats.lastVisit).toLocaleString()}</p>
        </div>
      ) : (
        <p>Loading insights...</p>
      )}
    </div>
  );
}
