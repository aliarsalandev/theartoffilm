import mongoose from "mongoose";
import { directorSchema } from "./directorModel.js";

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    seller: { type: mongoose.Schema.Types.ObjectID, ref: "User" },
    image: { type: String, required: false },
    images: [String],
    casts: [{ type: mongoose.Schema.Types.ObjectID, ref: "Cast" }],
    artists: [{ type: mongoose.Schema.Types.ObjectID, ref: "Artist" }],
    origin: { type: String, required: true },
    year: { type: Number, required: true },
    format: { type: String, required: true },
    condition: { type: String, required: true },
    rolledFolded: { type: String, required: true },
    countInStock: { type: Number, required: true },
    price: { type: Number, required: true },
    salePrice: { type: Number, required: true },
    description: { type: String, required: true },
    rating: { type: Number, required: true },
    numReviews: { type: Number, required: true },
    visible: { type: Boolean, required: true },
    forSale: { type: Boolean, required: true },
    reviews: [reviewSchema],
    directors: [{ type: mongoose.Schema.Types.ObjectID, ref: "Director" }],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
