import mongoose from "mongoose";

const BoardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  theme: {
    type: String,
    required: true,
  },
  timer: {
    type: Number,
    required: true,
  },
  participants: {
    type: [String],
    required: false,
  },
  columns: {
    type: [Object],
    required: true,
  },
  status: {
    type: String,
    enum: ["created", "active", "finalized", "archived"],
    required: true
  },
  createdAt: {
    type: Date,
    required: true
  }
});

export default mongoose.model("Board", BoardSchema);
