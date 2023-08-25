import mongoose from "mongoose";

const BoardSchema = new mongoose.Schema({
  boardName: {
    type: String,
    required: true,
  },
  theme: {
    type: Object,
    required: true,
  },
  users: {
    type: [Object],
    required: true,
  },
  columns: {
    type: [Object],
    required: true,
  },
  actionItems: {
    type: [Object],
    required: false,
  },
});

export default mongoose.model("Board", BoardSchema);
