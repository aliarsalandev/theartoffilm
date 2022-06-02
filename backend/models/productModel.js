import mongoose from 'mongoose';
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
    seller: { type: mongoose.Schema.Types.ObjectID, ref: 'User' },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    director: { type: String, required: true },
    cast: { type: String, required: true },
    artist: { type: String, required: true },
    origin: { type: String, required: true },
    format: { type: String, required: true },
    rolledFolded: { type: String, required: true },
    countInStock: { type: Number, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    //
    rating: { type: Number, required: true },
    numReviews: { type: Number, required: true },
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model('Product', productSchema);

export default Product;
