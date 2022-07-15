import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true },
    isSeller: { type: Boolean, default: false, required: true },
    address: { type: String, required: false },
    city: { type: String, required: false },
    postalCode: { type: String, required: false },
    country: { type: String, required: false },
    seller: {
      name: String,
      logo: String,
      description: String,
      stripe_account_id: String,
      shipping_cost: { type: Object, default: {} },
      rating: { type: Number, default: 0, required: true },
      numReviews: { type: Number, default: 0, required: true },
      subscription: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subscription",
      },
      subscription_period: {
        type: String,
        enum: ["month", "year"],
      },
      stripe_account_id: { type: String, required: false },
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);
export default User;
