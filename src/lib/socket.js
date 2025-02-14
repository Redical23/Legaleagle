import { io } from "socket.io-client";

let socket;

export const initializeSocket = () => {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_WEBSOCKET_URL || "http://localhost:3001", {
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 5000,
    });

    socket.on("connect", () => {
      console.log("✅ Connected to WebSocket server:", socket.id);
    });

    socket.on("disconnect", (reason) => {
      console.warn("⚠️ Socket disconnected:", reason);
    });

    socket.on("connect_error", (error) => {
      console.error("❌ WebSocket connection error:", error);
    });
  }
  return socket;
};

export const joinRoom = (room) => {
  if (socket) {
    socket.emit("join_room", room);
    console.log("🏠 Joined room:", room);
  } else {
    console.error("❌ Socket not initialized");
  }
};

export const sendMessage = (message, room) => {
  if (socket) {
    socket.emit("send_message", { message, room });
    console.log("📤 Sent message to room:", room, message);
  } else {
    console.error("❌ Socket not initialized");
  }
};

export const onMessage = (callback) => {
  if (socket) {
    socket.off("receive_message");
    socket.on("receive_message", (data) => {
      console.log("📩 Received message:", data);
      callback(data);
    });
  } else {
    console.error("❌ Socket not initialized");
  }
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export default {
  initializeSocket,
  joinRoom,
  sendMessage,
  onMessage,
  disconnectSocket,
};
