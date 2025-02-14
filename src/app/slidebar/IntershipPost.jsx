import { useState, useEffect, useRef } from "react";
import { Heart, MessageCircle, Share2, MoreHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useModelContext } from "../context/Context";

export function InternshipPost({
  name,
  email, // Post owner's email
  avatar,
  company,
  position,
  description,
  location,
  postedAt,
  companyLogo,
  likes: initialLikes,
  comments,
  postId,
  onDelete,
  onLike,
}) {
  const [likeCount, setLikeCount] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLikeAnimating, setIsLikeAnimating] = useState(false);
  const [showCopiedToast, setShowCopiedToast] = useState(false);
  const { email: currentUserEmail } = useModelContext(); // Get logged-in user's email
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLike = async () => {
    try {
      setIsLikeAnimating(true);
      const newIsLiked = !isLiked;
      setIsLiked(newIsLiked);
      setLikeCount((prev) => (newIsLiked ? prev + 1 : prev - 1));

      if (onLike) {
        await onLike(postId, newIsLiked);
      }
    } catch (error) {
      setIsLiked(!isLiked);
      setLikeCount((prev) => (isLiked ? prev + 1 : prev - 1));
      console.error("Failed to update like status:", error);
    } finally {
      setTimeout(() => setIsLikeAnimating(false), 300);
    }
  };

  const handleShare = async () => {
    try {
      const postUrl = `${window.location.origin}/post/${postId}`;
      await navigator.clipboard.writeText(postUrl);
      setShowCopiedToast(true);
      setTimeout(() => setShowCopiedToast(false), 2000);
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
    }
  };

  const handleDeletePost = async () => {
    if (email !== currentUserEmail) {
      alert("You can only delete your own posts!");
      return;
    }

    const confirmed = window.confirm("Are you sure you want to delete this post?");
    if (!confirmed) return;

    try {
      if (onDelete) {
        await onDelete(postId);
      }
    } catch (error) {
      console.error("Failed to delete post:", error);
      alert("Failed to delete post. Please try again.");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };
  const decodedEmail = currentUserEmail ? decodeURIComponent(currentUserEmail) : null;
console.log(email,decodedEmail)
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
              <p className="text-sm text-gray-400">{formatDate(postedAt)}</p>
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
                      onClick={() => alert(`Go to ${name}'s profile`)}
                    >
                      View Profile
                    </button>
                    {email === decodedEmail && (
                      <button
                        className="w-full text-left px-3 py-2 hover:bg-red-600 rounded transition-colors text-red-400 hover:text-white"
                        onClick={handleDeletePost}
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

          <div className="flex items-center space-x-6 mt-4 text-gray-400">
            <motion.button
              className={`flex items-center space-x-2 hover:text-blue-400 ${isLiked ? "text-red-400" : ""}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleLike}
            >
              <Heart size={18} fill={isLiked ? "currentColor" : "none"} className={isLiked ? "text-red-400" : ""} />
              <span className="text-sm">{likeCount}</span>
            </motion.button>

            <motion.button
              className="flex items-center space-x-2 hover:text-blue-400"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleShare}
            >
              <Share2 size={18} />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
