"use client";

import { useState, useEffect, useRef } from "react";
import { Heart, MessageCircle, Share2, MoreHorizontal, MapPin, LinkIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useModelContext } from "../context/Context";
import { useRouter } from "next/navigation";

export function InternshipPost({
  _id,
  id,
  name,
  email,
  avatar,
  description,
  location,
  link,
  postedAt,
  likes: initialLikes,
  postId,
  onDelete,
  onLike,
}) {
  const [likeCount, setLikeCount] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { email: currentUserEmail } = useModelContext();
  const menuRef = useRef(null);
  const router = useRouter();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const decodedEmail = currentUserEmail ? decodeURIComponent(currentUserEmail) : null;

  const handleDelete = async () => {
    if (!decodedEmail) {
      setError("User email not found.");
      return;
    }

    const confirmed = window.confirm("Are you sure you want to delete this post? This action cannot be undone.");
    if (!confirmed) return;

    setLoading(true);
    try {
      const res = await fetch("/api/posts", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to delete post.");
      }

      alert("Post deleted successfully!");
     
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="bg-[#001a5e] rounded-xl p-6 shadow-lg border border-blue-300 hover:bg-[#002080] transition-colors relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex items-start space-x-4">
        <motion.img
          src={avatar || "https://source.unsplash.com/random/100x100/?portrait"}
          alt={`${name}'s avatar`}
          className="w-12 h-12 rounded-full object-cover border-2 border-blue-400"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        />

        <div className="flex-1">
          <div className="flex items-center justify-between relative">
            <div>
              <h3 className="font-semibold text-blue-300 hover:text-blue-200 cursor-pointer">{name}</h3>
              <p className="text-sm text-gray-400">{new Date(postedAt).toLocaleString()}</p>
            </div>

            <div ref={menuRef} className="relative">
              <motion.button
                className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-blue-900/30"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <MoreHorizontal size={20} />
              </motion.button>

              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute top-10 right-0 bg-gray-800 text-white p-2 rounded-lg shadow-lg w-48 z-10"
                  >
                    <button
                      className="w-full text-left px-3 py-2 hover:bg-gray-700 rounded transition-colors"
                      onClick={() => router.push(`/userid/${id}`)}
                    >
                      View Profile
                    </button>
                    {email === decodedEmail && (
                      <button
                        className="w-full text-left px-3 py-2 hover:bg-red-600 rounded transition-colors text-red-400 hover:text-white"
                        onClick={handleDelete}
                      >
                        Delete Post
                      </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <p className="text-gray-300 mt-2 leading-relaxed">{description}</p>

          {location && (
            <div className="flex items-center text-gray-400 mt-2">
              <MapPin size={16} className="mr-2 text-blue-400" />
              <span>{location}</span>
            </div>
          )}

          {link && (
            <div className="mt-2">
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 flex items-center"
              >
                <LinkIcon size={16} className="mr-2" />
                {link}
              </a>
            </div>
          )}

          <div className="flex items-center space-x-6 mt-4 text-gray-400">
            {/* Like and share buttons */}
            {/* Add actual like and share buttons if needed */}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
