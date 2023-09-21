import mongoose from "mongoose";

const ColumnCardSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    get: function (isoDateString) {
      return new Date(isoDateString);
    },
    set: function (date) {
      return date.toISOString();
    },
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
  cardTags: {
    type: [String],
    required: false,
  },
  cardReactions: {
    type: [String],
    required: false,
  },
  cardReplies: {
    type: [{ type: mongoose.Schema.ObjectId, ref: "ColumnCardReply" }],
    required: false,
  },
});

export default mongoose.model("ColumnCard", ColumnCardSchema);
