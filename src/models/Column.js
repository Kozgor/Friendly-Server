import mongoose from "mongoose";

const ColumnSchema = new mongoose.Schema({
  columnId: {
    type: String,
    required: true,
  },
  columnTitle: {
    type: String,
    required: true,
  },
  columnSubtitle: {
    type: String,
    required: false,
  },
  columnAvatar: {
    type: String,
    required: false,
  },
  columnStyle: {
    type: String,
    required: true,
  },
  columnCards: {
    type: [{ type: mongoose.Schema.ObjectId, ref: "ColumnCard" }],
    required: false,
  },
});

export default mongoose.model("Column", ColumnSchema);
