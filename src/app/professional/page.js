"use client";
import { useEffect, useState } from "react";
import socket from "../../app/lib/socketclient";

export default function ChatComponent() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on("message", (msg) => {
      setChat((prev) => [...prev, msg]);
    });

    return () => socket.off("message");
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("message", message);
      setMessage("");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Live Chat</h2>
      <div className="border p-4 h-60 overflow-y-auto bg-gray-100 rounded">
        {chat.map((msg, i) => (
          <div key={i} className="mb-2 p-2 bg-white rounded">
            {msg}
          </div>
        ))}
      </div>
      <input
        type="text"
        className="border p-2 w-full mt-4"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
        onClick={sendMessage}
      >
        Send
      </button>
    </div>
  );
}
