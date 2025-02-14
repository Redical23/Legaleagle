"use client";

import React, { useState, useEffect } from "react";
import { InternshipPost } from "../slidebar/IntershipPost";
import { CreatePost } from "../slidebar/Createpost";
import { Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LAHEAD from "../slidebar/LAHEAD";

function InternshipFeed() {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch posts on component mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/posts");
        const data = await response.json();
        
        console.log("📢 Fetched posts from API:", data); // Debugging line
  
        if (data.success) {
          setPosts(data.data);
        } else {
          console.error("⚠️ API error:", data.message);
        }
      } catch (error) {
        console.error("❌ Fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchPosts();
  }, []);
  

  const handleNewPost = (newPost) => {
    setPosts([newPost, ...posts]);
    setShowCreatePost(false);
  };

  return (
    <div>
      <LAHEAD />
      <div className="min-h-screen bg-[#00103a] text-white py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">
            Internship Opportunities
          </h1>
          <AnimatePresence>
            {showCreatePost && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <CreatePost
                  onPost={handleNewPost}
                  onClose={() => setShowCreatePost(false)}
                />
              </motion.div>
            )}
          </AnimatePresence>

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
        <motion.button
          className="fixed bottom-8 right-8 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowCreatePost(true)}
        >
          <Plus size={24} />
        </motion.button>
      </div>
    </div>
  );
}

export default InternshipFeed;
