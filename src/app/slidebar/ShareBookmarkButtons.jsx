"use client";

import { useEffect, useState } from "react";
import { Share2, Bookmark } from "lucide-react";
import { useModelContext } from "../context/Context";

export default function ShareBookmarkButtons({ newsId }) {
  const { email } = useModelContext();
  const decodedEmail = email ? decodeURIComponent(email) : null;
  const [isCopied, setIsCopied] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // 1️⃣ Check initial bookmark state
  useEffect(() => {
    const fetchBookmarkStatus = async () => {
      if (!decodedEmail || !newsId) return;
      try {
        const res = await fetch(`/api/bookmark?email=${decodedEmail}&newsId=${newsId}`);
        const data = await res.json();
        setIsBookmarked(data.isBookmarked); // Assumes API returns { isBookmarked: true/false }
      } catch (error) {
        console.error("Error checking bookmark status:", error);
      }
    };

    fetchBookmarkStatus();
  }, [decodedEmail, newsId]);

  // 2️⃣ Copy the shareable link
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

  // 3️⃣ Toggle bookmark
  const handleBookmarkToggle = async () => {
    if (!decodedEmail || !newsId) return;

    try {
      const method = isBookmarked ? "DELETE" : "POST";
      const res = await fetch("/api/bookmark", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: decodedEmail, newsId }),
      });

      if (res.ok) {
        setIsBookmarked(!isBookmarked);
        alert(isBookmarked ? "Bookmark removed." : "Article bookmarked!");
      } else {
        console.error("Bookmark toggle failed.");
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <button onClick={handleShare} className="p-2 hover:bg-white/10 rounded-full transition-colors">
        <Share2 className="w-5 h-5 text-white" />
      </button>
      {isCopied && <span className="text-green-400 text-sm">Link copied!</span>}
      <button onClick={handleBookmarkToggle} className="p-2 hover:bg-white/10 rounded-full transition-colors">
        <Bookmark className={`w-5 h-5 ${isBookmarked ? "text-yellow-400" : "text-white"}`} />
      </button>
    </div>
  );
}
