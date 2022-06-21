import mongoose from "mongoose";

import MongooseFloat from "mongoose-float";
const Float = MongooseFloat.loadType(mongoose);
const settingSchema = new mongoose.Schema(
  {
    commission: { type: Float, default: 0.0 },
    stripe_private_key: { type: String, default: "" },
    site_logo: { type: String, default: "" },
    site_favicon: { type: String, default: "" },
    site_keywords: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);
const Setting = mongoose.model("Setting", settingSchema);
export default Setting;
