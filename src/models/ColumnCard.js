import mongoose from "mongoose";

const ColumnCardSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    required: true,
  },
  boardId: {
    type: String,
    required: true,
  },
  columnId: {
    type: String,
    required: true,
  },
  cardComment: {
    type: String,
    required: true,
  },
  cardAuthor: {
    type: String,
    required: true,
  },
  cardAuthorAvatar: {
    type: String,
    required: false,
  },
  cardAuthorId: {
    type: String,
    required: true,
  },
  cardTags: {
    type: [String],
    required: false,
  },
  cardReactions: [
    {
      userId: {
        type: String,
        required: true,
      },
      reaction: {
        type: String || null,
        required: false,
      },
    },
  ],
  cardReplies: {
    type: [Boolean],
    required: false,
  },
});

export default mongoose.model("ColumnCard", ColumnCardSchema);
