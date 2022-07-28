import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    routing_number: { type: String, required: true },
    paypal_email: { type: String, required: false },
    account_number: { type: String, required: true },
    country: { type: String, required: true },
    currency: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
