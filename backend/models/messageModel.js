import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true },
    order: { type: mongoose.Schema.Types.ObjectId, required: true },
    message: { type: String, required: true },
    read: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", messageSchema);
export default Message;
