"use client";

import React, { useState, useEffect } from "react";
import { Image, MapPin, X, LinkIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useModelContext } from "../context/Context";

export function CreatePost({ onPost, onClose }) {
  const { email } = useModelContext(); // Get email from Context
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [location, setLocation] = useState(""); // ✅ Added location field
  const [loading, setLoading] = useState(false);

  const decodedEmail = email ? decodeURIComponent(email) : null;

  useEffect(() => {
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

    if (decodedEmail) {
      fetchUserData();
    }
  }, [decodedEmail]);

  const handlePost = async () => {
    if (!user || !user.email) {
      alert("User data is not loaded yet. Please try again.");
      return;
    }

    if (description.trim() === "") {
      alert("Description cannot be empty");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user.name, // ✅ Send user's name
          avatar: user.avatar, // ✅ Send user's avatar
          email: user.email, // ✅ Ensure email is included
          description,
          link,
          location, // ✅ Send location
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Post created successfully!");
        onPost(data.data);
        setDescription("");
        setLink("");
        setLocation(""); // ✅ Reset location input
      } else {
        alert("Failed to create post: " + data.message);
      }
    } catch (error) {
      console.error("Error creating post:", error);
      alert("An error occurred while creating the post.");
    } finally {
      setLoading(false);
    }
  };

  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>Loading...</div>;

  return (
    <motion.div
      className="bg-[#001a5e] rounded-xl p-6 shadow-lg border border-blue-300 mb-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Create New Post</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-white">
          <X size={24} />
        </button>
      </div>
      <div className="flex space-x-4">
        <img
          src={user?.avatar || "https://via.placeholder.com/100"}
          alt="User Avatar"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-1">
          <textarea
            placeholder="Post a new internship opportunity..."
            className="w-full bg-[#002080] text-white border-b border-blue-300 focus:border-blue-500 focus:ring-0 resize-none overflow-hidden min-h-[100px] p-2 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="text"
            placeholder="Add a link (optional)"
            className="w-full bg-[#002080] text-white border-b border-blue-300 focus:border-blue-500 focus:ring-0 p-2 mt-2 rounded"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />

          <input
            type="text"
            placeholder="Add location (optional)" // ✅ Location input
            className="w-full bg-[#002080] text-white border-b border-blue-300 focus:border-blue-500 focus:ring-0 p-2 mt-2 rounded"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <div className="flex items-center justify-between mt-4">
            <div className="flex space-x-4">
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="text-gray-400 hover:text-white" aria-label="Attach an image">
                <Image size={20} />
              </motion.button>
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="text-gray-400 hover:text-white" aria-label="Add a location">
                <MapPin size={20} />
              </motion.button>
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="text-gray-400 hover:text-white" aria-label="Add a link">
                <LinkIcon size={20} />
              </motion.button>
            </div>
            <motion.button
              className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors disabled:opacity-50"
              onClick={handlePost}
              disabled={description.trim() === ""}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {loading ? "Posting..." : "Post"}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
