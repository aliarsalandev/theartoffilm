import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    url: { type: String, required: true },
    type: { type: String, required: true, enum: ["subscription", "poster"] },
    ref: { type: mongoose.Schema.Types.ObjectId },
    period: { type: String, enum: ["month", "year"] },
    status: { type: String, required: true, enum: ["unpaid", "paid"] },
  },
  {
    timestamps: true,
  }
);
const Session = mongoose.model("Session", sessionSchema);
export default Session;
