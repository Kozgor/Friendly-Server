import mongoose from "mongoose";

const ColumnCardCommentSchema = new mongoose.Schema({
  commentMessage: {
    type: String,
    required: true,
  },
  commentAuthor: {
    type: String,
    required: true,
  },
});

export default mongoose.model("ColumnCardComment", ColumnCardCommentSchema);
