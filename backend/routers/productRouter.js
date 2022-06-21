import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";
import { isAdmin, isAuth, isSellerOrAdmin } from "../utils.js";

const productRouter = express.Router();

// Filters
productRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const pageSize = 4;
    const page = Number(req.query.pageNumber) || 1;
    const name = req.query.name || "";
    // const category = req.query.category || '';
    const director = req.query.directors || "";
    const cast = req.query.casts || "";
    const artist = req.query.artists || "";
    const origin = req.query.origin || "";
    const format = req.query.format || "";
    const condition = req.query.condition || "";
    const rolledFolded = req.query.rolledFolded || "";
    const seller = req.query.seller || "";
    const order = req.query.order || "";
    const min =
      req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
    const max =
      req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;
    const rating =
      req.query.rating && Number(req.query.rating) !== 0
        ? Number(req.query.rating)
        : 0;

    const nameFilter = name ? { name: { $regex: name, $options: "i" } } : {};
    const sellerFilter = seller ? { seller } : {};
    //
    // const categoryFilter = category ? { category } : {};
    const directorFilter = director ? { director } : {};
    const castFilter = cast ? { cast } : {};
    const artistFilter = artist ? { artist } : {};
    const originFilter = origin ? { origin } : {};
    const formatFilter = format ? { format } : {};
    const conditionFilter = condition ? { condition } : {};
    const rolledFoldedFilter = rolledFolded ? { rolledFolded } : {};

    //
    const priceFilter = min && max ? { price: { $gte: min, $lte: max } } : {};
    const ratingFilter = rating ? { rating: { $gte: rating } } : {};
    const sortOrder =
      order === "lowest"
        ? { price: 1 }
        : order === "highest"
        ? { price: -1 }
        : order === "toprated"
        ? { rating: -1 }
        : { _id: -1 };
    const count = await Product.count({
      ...sellerFilter,
      ...nameFilter,
      // ...categoryFilter,
      ...directorFilter,
      ...castFilter,
      ...artistFilter,
      ...originFilter,
      ...formatFilter,
      ...conditionFilter,
      ...rolledFoldedFilter,
      ...priceFilter,
      ...ratingFilter,
    });
    const products = await Product.find({
      ...sellerFilter,
      ...nameFilter,
      // ...categoryFilter,
      ...directorFilter,
      ...castFilter,
      ...artistFilter,
      ...originFilter,
      ...formatFilter,
      ...conditionFilter,
      ...rolledFoldedFilter,
      ...priceFilter,
      ...ratingFilter,
    })
      .populate("seller", "seller.name seller.logo")
      .populate("directors")
      .populate("casts")
      .populate("artists")
      .sort(sortOrder)
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    res.send({ products, page, pages: Math.ceil(count / pageSize) });
  })
);

// productRouter.get(
//   '/categories',
//   expressAsyncHandler(async (req, res) => {
//     const categories = await Product.find().distinct('category');
//     res.send(categories);
//   })
// );
// productRouter.get(
//   '/directors',
//   expressAsyncHandler(async (req, res) => {
//     const directors = await Product.find().distinct('director');
//     res.send(directors);
//   })
// );

// productRouter.get(
//   '/casts',
//   expressAsyncHandler(async (req, res) => {
//     const casts = await Product.find().distinct('cast');
//     res.send(casts);
//   })
// );

productRouter.get(
  "/origins",
  expressAsyncHandler(async (req, res) => {
    const origins = await Product.find().distinct("origin");
    res.send(origins);
  })
);

productRouter.get(
  "/formats",
  expressAsyncHandler(async (req, res) => {
    const formats = await Product.find().distinct("format");
    res.send(formats);
  })
);
productRouter.get(
  "/conditions",
  expressAsyncHandler(async (req, res) => {
    const conditions = await Product.find().distinct("condition");
    res.send(conditions);
  })
);

productRouter.get(
  "/rolledFoldeds",
  expressAsyncHandler(async (req, res) => {
    const rolledFoldeds = await Product.find().distinct("rolledFolded");
    res.send(rolledFoldeds);
  })
);

productRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    // await Product.remove({});
    const seller = await User.findOne({ isSeller: true });
    if (seller) {
      const products = data.products.map((product) => ({
        ...product,
        seller: seller._id,
      }));
      const createdProducts = await Product.insertMany(products);
      res.send({ createdProducts });
    } else {
      res
        .status(500)
        .send({ message: "No seller found. first run /api/users/seed" });
    }
  })
);

productRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
      .populate(
        "seller",
        "seller.name seller.logo seller.rating seller.numReviews"
      )
      .populate("directors")
      .populate("casts")
      .populate("artists");
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

productRouter.post(
  "/",
  isAuth,
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = new Product({
      name: "sample name " + Date.now(),
      seller: req.user._id,
      image: "",
      // brand: '',
      // category: '',
      director: "",
      cast: "",
      artist: "",
      origin: "",
      year: 1930,
      format: "",
      condition: "",
      rolledFolded: "",
      countInStock: 0,
      price: 0,
      salePrice: 0,
      rating: 0,
      numReviews: 0,
      directors: [],
      visible: false,
      forSale: false,
      description: "sample description",
    });
    const createdProduct = await product.save();
    res.send({ message: "Product Created", product: createdProduct });
  })
);
productRouter.put(
  "/:id",
  isAuth,
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      // const { name, image, brand, category, director, cast, artist, origin, year, format, condition, rolledFolded, countInStock, price, salePrice, rating, numReviews, directors, visible, forSale, description } = req.body;
      product.name = req.body.name;
      product.image = req.body.image;
      product.images = req.body.images;
      // product.brand = req.body.brand;
      // product.category = req.body.category;
      product.casts = req.body.casts;
      product.origin = req.body.origin;
      product.year = req.body.year;
      product.format = req.body.format;
      product.condition = req.body.condition;
      product.rolledFolded = req.body.rolledFolded;
      product.countInStock = req.body.countInStock;
      product.price = req.body.price;
      product.salePrice = req.body.salePrice;
      product.description = req.body.description;
      product.artists = req.body.artists;
      product.directors = req.body.directors;
      product.visible = req.body.visible;
      product.forSale = req.body.forSale;
      const updatedProduct = await product.save();
      res.send({ message: "Product Updated", product: updatedProduct });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

productRouter.delete(
  "/:id",
  isAuth,
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      const deleteProduct = await product.remove();
      res.send({ message: "Product Deleted", product: deleteProduct });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

productRouter.post(
  "/:id/reviews",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      if (product.reviews.find((x) => x.name === req.user.name)) {
        return res
          .status(400)
          .send({ message: "You already submitted a review" });
      }
      const review = {
        name: req.user.name,
        rating: Number(req.body.rating),
        comment: req.body.comment,
      };
      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((a, c) => c.rating + a, 0) /
        product.reviews.length;
      const updatedProduct = await product.save();
      res.status(201).send({
        message: "Review Created",
        review: updatedProduct.reviews[updatedProduct.reviews.length - 1],
      });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

export default productRouter;
