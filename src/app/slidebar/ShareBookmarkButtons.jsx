"use client";

import { useState } from "react";
import { Share2, Bookmark } from "lucide-react";
import { useModelContext } from "../context/Context"; // Adjust the path as needed

export default function ShareBookmarkButtons({ newsId }) {
  const { email } = useModelContext(); // Get logged-in user (must provide an email)
  const decodedEmail = email ? decodeURIComponent(email) : null;
  const [isCopied, setIsCopied] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Copy the shareable link to the clipboard
  const handleShare = async () => {
    const shareableLink = `${window.location.origin}/News/${newsId}`;

    try {
      await navigator.clipboard.writeText(shareableLink);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy link:", error);
    }
  };

  // Send a POST request to the /api/bookmark endpoint
  const handleBookmark = async () => {
   
    try {
      const res = await fetch("/api/bookmark", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: decodedEmail , newsId }),
      });
      if (res.ok) {
        setIsBookmarked(true);
        alert("Article bookmarked!");
      } else {
        console.error("Bookmarking failed.");
      }
    } catch (error) {
      console.error("Error bookmarking article:", error);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={handleShare}
        className="p-2 hover:bg-white/10 rounded-full transition-colors"
      >
        <Share2 className="w-5 h-5" />
      </button>
      {isCopied && <span className="text-green-400 text-sm">Link copied!</span>}
      <button
        onClick={handleBookmark}
        className="p-2 hover:bg-white/10 rounded-full transition-colors"
      >
        <Bookmark className="w-5 h-5" />
      </button>
    </div>
  );
}
