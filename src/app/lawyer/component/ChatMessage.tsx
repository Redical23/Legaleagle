interface ChatMessageProps {
  content: string;
  timestamp: string;
  isSent: boolean;
}

export default function ChatMessage({ content, timestamp, isSent }: ChatMessageProps) {
  return (
    <div className={`flex ${isSent ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[70%] rounded-lg px-4 py-2 ${isSent ? "bg-blue-600 text-white" : "bg-gray-700 text-white"}`}
      >
        <p className="break-words">{content}</p>
        <p className={`text-xs mt-1 ${isSent ? "text-blue-200" : "text-gray-400"}`}>
          {new Date(timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
}
