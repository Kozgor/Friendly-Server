import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: false,
      unique: false,
    },
    passwordHash: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      required: true,
      default: "user",
      enum: ["user", "admin"],
    },
    avatar: {
      type: String,
      required: true,
    },
  }, {
    timestamps: true,
  }
);

export default mongoose.model("User", UserSchema);
