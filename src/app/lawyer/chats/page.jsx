"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Sidebar from "../component/Sidebar";
import { useModelContext } from "../../context/Context";
import ChatMessage from "../component/ChatMessage";
import { ChatInput } from "../component/ChatInput";
import LAHEAD from "../../slidebar/LAHEAD";
import { ChatHeader } from "../component/ChatHeader";
import { initializeSocket, joinRoom, sendMessage } from "../../../lib/socket";

const Page = () => {
  console.log("🚀 Rendering Page component");

  const { email, currentchat } = useModelContext();
  const decodedEmail = email ? decodeURIComponent(email) : null;

  console.log("🟢 Context values:", { email, decodedEmail, currentchat });

  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null);
  const messagesRef = useRef(messages); // Track latest messages

  // Keep messagesRef in sync
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  // Function to add new message dynamically
  const addMessage = useCallback((message) => {
    console.log("📩 Adding message:", message);
    setMessages((prevMessages) => [...prevMessages, message]);
  }, []);

  // Initialize WebSocket and listen for messages
useEffect(() => {
  if (!decodedEmail || !currentchat) {
    console.warn("⚠️ Waiting for email and currentchat...");
    return; // 🔴 Prevent WebSocket from initializing too early
  }

  console.log("🔌 Initializing WebSocket...");
  if (!socketRef.current) {
    socketRef.current = initializeSocket();
  }

  socketRef.current.on("connect", () => {
    console.log("✅ WebSocket Connected!");

    const room = `${decodedEmail}_${currentchat}`;
    joinRoom(room);
    console.log(`🏠 Joined room: ${room}`);
  });

  socketRef.current.on("disconnect", () => {
    console.warn("⚠️ WebSocket Disconnected. Reconnecting...");
    socketRef.current = null; // Force reinitialization
  });

  socketRef.current.on("receive_message", (message) => {
    console.log("📨 New message received:", message);
    setMessages((prev) => [...prev, message]); // ✅ Update UI in real time
  });

  return () => {
    if (socketRef.current) {
      console.log("❌ Disconnecting WebSocket...");
      socketRef.current.disconnect();
      socketRef.current = null;
    }
  };
}, [decodedEmail, currentchat]); // ✅ Only run when values are available
// ✅ Re-run when chat changes


  // Fetch messages when switching chat rooms
  useEffect(() => {
    if (!decodedEmail || !currentchat) {
      console.warn("⚠️ Missing email or currentchat");
      return;
    }

    const room = `${decodedEmail}_${currentchat}`;
    console.log(`🏠 Fetching messages for room: ${room}`);
    joinRoom(room);

    const fetchMessages = async () => {
      try {
        const res = await fetch(
          `/api/message?lawyer=${encodeURIComponent(decodedEmail)}&client=${encodeURIComponent(currentchat)}`
        );
        const data = await res.json();

        if (res.ok) {
          console.log("📬 Fetched messages:", data.messages);
          setMessages(data.messages || []);
        } else {
          console.error("❌ Error fetching messages:", data.error);
        }
      } catch (err) {
        console.error("❌ Failed to fetch messages:", err);
      }
    };

    fetchMessages();
  }, [decodedEmail, currentchat]);

  // Handle sending messages
  const handleSendMessage = useCallback(
    async (content) => {
      if (!currentchat || !decodedEmail) {
        console.error("⚠️ Cannot send message: Missing required data", {
          currentchat,
          decodedEmail,
        });
        return;
      }

      const messageData = {
        from: decodedEmail,
        to: currentchat,
        content: content.trim(),
        timestamp: new Date().toISOString(),
      };

      console.log("📤 Sending message:", messageData);

      // ✅ Update UI immediately
      setMessages((prevMessages) => [...prevMessages, { ...messageData, isSent: true }]);

      try {
        const res = await fetch("/api/message", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(messageData),
        });

        if (!res.ok) {
          const error = await res.json();
          throw new Error(error.error || "Failed to send message");
        }

        sendMessage(messageData, `${decodedEmail}_${currentchat}`); // ✅ Send via WebSocket
      } catch (error) {
        console.error("❌ Error sending message:", error);
      }
    },
    [currentchat, decodedEmail]
  );

  return (
    <div className="h-screen flex flex-col bg-[#001845]">
      <LAHEAD />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        {currentchat ? (
          <div className="flex flex-col flex-1 bg-[#001230]">
            <ChatHeader />
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <div className="flex items-center justify-center h-full text-gray-400">
                  <p>No messages yet. Start a conversation!</p>
                </div>
              ) : (
                messages.map((message) => (
                  <ChatMessage
                    key={message.id || message._id}
                    content={message.content}
                    timestamp={message.timestamp}
                    isSent={message.from === decodedEmail}
                  />
                ))
              )}
            </div>
            <ChatInput onSendMessage={handleSendMessage} />
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-[#001230] text-gray-400">
            <p className="text-xl mb-2">Welcome to your chat</p>
            <p>Select a conversation to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
