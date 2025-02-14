"use client";
import { useEffect } from "react";

const TrackVisit = ({ userId }) => {
  useEffect(() => {
    console.log("Tracking visit for userId:", userId);
    if (!userId) return; // Prevent unnecessary calls
  
    const trackVisit = async () => {
      try {
        const response = await fetch("/api/track-visit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        });
  
        if (!response.ok) {
          console.error("Failed to track visit");
        }
      } catch (error) {
        console.error("Error tracking visit:", error);
      }
    };
  
    trackVisit();
  }, [userId]); // Only run when userId changes
  
  return null; // This component has no UI, it just tracks visits
};

export default TrackVisit;
