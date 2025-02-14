import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  lawyer: { type: String, required: true, unique: true },
  clients: { type: [String], required: true, default: [] }
});

// Ensure duplicate clients are not allowed inside `clients` array
MessageSchema.pre("save", function (next) {
  this.clients = [...new Set(this.clients)]; // Remove duplicates before saving
  next();
});

const Message = mongoose.models.Message || mongoose.model("Message", MessageSchema);

export default Message;
