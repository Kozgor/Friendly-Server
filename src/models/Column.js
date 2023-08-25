import mongoose from "mongoose";

const ColumnSchema = new mongoose.Schema({
  columnTitle: {
    type: String,
    required: true,
  },
  columnAvatar: {
    type: String,
    required: false,
  },
  columnSubtittle: {
    type: String,
    required: false,
  },
  columnColor: {
    type: String,
    required: true,
  },
  columnCards: {
    type: [String],
    required: false,
  },
});

export default mongoose.model("Column", ColumnSchema);
