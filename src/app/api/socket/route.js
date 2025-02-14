import { Server } from "socket.io";
import { NextResponse } from "next/server";

if (!global.io) {
  console.log("Initializing Socket.IO server...");

  const io = new Server(3001, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("🟢 User connected:", socket.id);

    socket.on("join_room", (room) => {
      socket.join(room);
      console.log(`🏠 User ${socket.id} joined room: ${room}`);
    });

    socket.on("send_message", (data) => {
      console.log("📤 Message received from client:", data);
      io.to(data.room).emit("receive_message", data); // Broadcast to the correct room
    });

    socket.on("disconnect", () => {
      console.log("🔴 User disconnected:", socket.id);
    });
  });

  global.io = io;
} else {
  console.log("Socket.IO server already running.");
}

export const GET = async () => {
  return NextResponse.json({ message: "Socket.io is running" });
};
