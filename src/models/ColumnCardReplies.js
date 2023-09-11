import mongoose from "mongoose";

const ColumnCardReplySchema = new mongoose.Schema({
  commentMessage: {
    type: String,
    required: true,
  },
  commentAuthor: {
    type: String,
    required: true,
  },
});

export default mongoose.model("ColumnCardReply", ColumnCardReplySchema);
