import mongoose from "mongoose";

const AdminSettingsSchema = new mongoose.Schema({
  columns: {
    type: [Object],
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

export default mongoose.model("AdminSettings", AdminSettingsSchema);
