"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useModelContext } from "../../context/Context";

export default function BookmarkPage() {
  const { email } = useModelContext(); // Get email from Context
  const [user, setUser] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [error, setError] = useState(null);
  const decodedEmail = email ? decodeURIComponent(email) : null;
  const router = useRouter();

  useEffect(() => {
    // Fetch user data by email
    const fetchUserData = async () => {
      if (!decodedEmail) return;
      
      try {
        const res = await fetch(`/api/users?email=${decodedEmail}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Failed to fetch user data");

        setUser(data);
      } catch (error) {
        console.error("❌ Error fetching user:", error.message);
        setError(error.message);
      }
    };

    fetchUserData();
  }, [decodedEmail]);

  useEffect(() => {
    // Fetch bookmarked articles
    const fetchBookmarks = async () => {
      if (!user?.bookmarks || user.bookmarks.length === 0) return;

      try {
        const ids = user.bookmarks.join(",");
        console.log("📢 Fetching news for IDs:", ids);
        
        const res = await fetch(`/api/bookmark?ids=${ids}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Failed to fetch bookmarks");

        // ✅ Ensure unique bookmarks
        const uniqueBookmarks = [...new Map(data.map((item) => [item._id, item])).values()];
        console.log("✅ Filtered Unique News:", uniqueBookmarks.map(n => n._id));

        setBookmarks(uniqueBookmarks);
      } catch (error) {
        console.error("❌ Error fetching bookmarks:", error.message);
        setError(error.message);
      }
    };

    fetchBookmarks();
  }, [user]);

  if (error) {
    return <div className="text-red-500 p-4">Error: {error}</div>;
  }

  if (!user || bookmarks.length === 0) {
    return <div className="text-white p-4">Loading or No Bookmarks...</div>;
  }

  return (
    <div className="min-h-screen bg-[#020B2C] text-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 text-white">Your Bookmarked News</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookmarks.map((news) => (
            <div 
              key={news._id} 
              className="bg-white/5 backdrop-blur rounded-xl overflow-hidden cursor-pointer transition-transform transform hover:scale-105"
              onClick={() => {
                console.log("Navigating to:", news._id);
                router.push(`/newsid/${news._id}`);
              }}
            >
              <div className="relative h-[250px] w-full">
                <Image 
                  src={news.image || "/placeholder.svg"} 
                  alt={news.headline} 
                  fill 
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-white">{news.headline}</h2>
                <p className="text-gray-300 mt-2">{news.description}</p>
                <p className="text-gray-400 text-sm mt-2">🆔 ID: {news._id}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
