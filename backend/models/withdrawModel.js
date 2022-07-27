import mongoose from "mongoose";

const withdrawSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    status: { type: String, required: true, default: "unpaid" },
  },
  {
    timestamps: true,
  }
);
const Withdraw = mongoose.model("Withdraw", withdrawSchema);
export default Withdraw;
