"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import type React from "react";

interface ChatInputProps {
  onSendMessage: (message: string) => Promise<void>;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      await onSendMessage(message.trim());
      setMessage("");
      setError("");
    } catch (err) {
      console.error("❌ Error sending message:", err);
      setError("Failed to send message. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 bg-[#001845] p-4 border-t border-gray-700">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message"
        className="flex-1 p-2 rounded-full bg-[#002060] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 border-none"
      />
      <button type="submit" className="p-2 hover:bg-[#002060] rounded-full transition-colors" disabled={!message.trim()}>
        <Send className="w-6 h-6 text-blue-400" />
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  );
};
