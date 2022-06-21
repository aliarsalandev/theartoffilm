import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: false },
    currency: { type: String, required: true },
    products: { type: Number, required: true, default: 0 },
    monthPrice: { type: Number, required: true },
    yearPrice: { type: String, required: true },
    perks: { type: Array, required: true },
  },
  {
    timestamps: true,
  }
);
const Subscription = mongoose.model("Subscription", subscriptionSchema);
export default Subscription;
