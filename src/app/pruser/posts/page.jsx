"use client";

import React, { useState, useEffect } from "react";
import { InternshipPost } from "../../slidebar/IntershipPost";
import { motion } from "framer-motion";
import LAHEAD from "../../slidebar/LAHEAD";
import { useModelContext } from "../../context/Context";

function InternshipFeed() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { email } = useModelContext();
  const decodedEmail = email ? decodeURIComponent(email) : null;

  useEffect(() => {
    const fetchPosts = async () => {
      if (!decodedEmail) return;
      try {
        const response = await fetch("/api/posts", { cache: "no-store" });
        const data = await response.json();

        console.log("\ud83d\udce2 Fetched posts from API:", data); // Debugging line

        if (data.success) {
          const userPosts = data.data.filter(post => post.email === decodedEmail);
          setPosts(userPosts);
        } else {
          console.error("\u26a0\ufe0f API error:", data.message);
        }
      } catch (error) {
        console.error("\u274c Fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [decodedEmail]);

  return (
    <div>
      <LAHEAD />
      <div className="min-h-screen bg-[#00103a] text-white py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">
            Internship Opportunities
          </h1>
          {isLoading ? (
            <div className="text-center text-blue-400">Loading posts...</div>
          ) : posts.length > 0 ? (
            <div className="space-y-4">
              {posts.map((post, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <InternshipPost {...post} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-400">No posts available</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default InternshipFeed;
