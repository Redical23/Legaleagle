// "use client"
// import { useEffect, useState } from "react";
// import { io } from "socket.io-client";
// import axios from "axios";

// const socket = io("http://localhost:5000"); // Change to backend URL

// export default function Chat({ user }) {
//     const [message, setMessage] = useState("");
//     const [messages, setMessages] = useState([]);

//     useEffect(() => {
//         socket.on("receiveMessage", (msg) => {
//             setMessages((prev) => [...prev, msg]);
//         });

//         return () => {
//             socket.off("receiveMessage");
//         };
//     }, []);

//     useEffect(() => {
//         const fetchMessages = async () => {
//             const res = await axios.get("http://localhost:5000/messages");
//             setMessages(res.data);
//         };
//         fetchMessages();
//     }, []);

//     const sendMessage = () => {
//         if (message.trim()) {
//             const msg = { from: user, to: "All", content: message };
//             socket.emit("sendMessage", msg);
//             setMessage("");
//         }
//     };

//     return (
//         <div>
//             <div style={{ height: "300px", overflowY: "scroll" }}>
//                 {messages.map((msg, index) => (
//                     <div key={index}>
//                         <strong>{msg.from}: </strong> {msg.content}
//                     </div>
//                 ))}
//             </div>
//             <input
//                 type="text"
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 placeholder="Type a message..."
//             />
//             <button onClick={sendMessage}>Send</button>
//         </div>
//     );
// }
