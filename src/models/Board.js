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
  columns: {
    type: [Object],
    required: true,
  },
  status: {
    type: String,
    enum: ["created", "active", "finalized", "archived"],
    required: true
  },
});

export default mongoose.model("Board", BoardSchema);
