import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const ConversationSchema = new mongoose.Schema(
  {
    participants: { type: [String], required: true },
    messages: [MessageSchema],
  },
  { timestamps: true }
);

const Conversation = mongoose.models.Conversation || mongoose.model("Conversation", ConversationSchema);

export default Conversation;
