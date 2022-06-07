import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: false },
    monthPrice: { type: Number, required: true },
    yearPrice: { type: String, required: true },
    posters: { type: Number, required: true },
    posterImages: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);
const Subscription = mongoose.model("Subscription", subscriptionSchema);
export default Subscription;
