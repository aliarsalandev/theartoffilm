import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";
import { isAdmin, isAuth, isSellerOrAdmin } from "../utils.js";

const productRouter = express.Router();

// Filters

productRouter.get(
  "/search",
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const PAGE_SIZE = 10;

    const pageNumber = parseInt(req.query.pageNumber) || 1;
    const name = query.name !== undefined ? query.name : "";
    const directors =
      query.directors !== undefined && query.directors !== ""
        ? [query.directors]
        : [];
    const casts =
      query.casts !== undefined && query.casts !== "" ? [query.casts] : [];
    const artists =
      query.artists !== undefined && query.artists !== ""
        ? [query.artists]
        : [];
    const origin = query.origin !== undefined ? query.origin : "";
    const format = query.format !== undefined ? query.format : "";
    const rolledFolded =
      query.rolledFolded !== undefined ? query.rolledFolded : "";
    const condition = query.condition !== undefined ? query.condition : "";

    const price = query.price !== undefined ? query.price : "";

    if (name !== "") {
      var nameFilter =
        name && name !== ""
          ? {
              name: {
                $regex: name,
                $options: "i",
              },
            }
          : {};
    }

    if (directors && directors.length > 0) {
      var directorFilter =
        directors && directors.length > 0
          ? {
              directors: {
                $in: directors,
              },
            }
          : {};
    }

    if (casts && casts.length > 0) {
      var castFilter =
        casts && casts.length > 0
          ? {
              casts: {
                $in: casts,
              },
            }
          : {};
    }

    if (artists && artists.length > 0) {
      var artistFilter =
        artists && artists.length > 0
          ? {
              artists: {
                $in: artists,
              },
            }
          : {};
    }

    if (origin !== "") {
      var originFilter =
        origin && origin !== ""
          ? {
              origin: {
                $regex: origin,
                $options: "i",
              },
            }
          : {};
    }

    if (format !== "") {
      var formatFilter =
        format && format !== ""
          ? {
              format: {
                $regex: format,
                $options: "i",
              },
            }
          : {};
    }

    if (rolledFolded !== "") {
      var rolledFoldedFilter =
        rolledFolded && rolledFolded !== ""
          ? {
              rolledFolded: {
                $regex: rolledFolded,
                $options: "i",
              },
            }
          : {};
    }

    if (condition !== "") {
      var conditionFilter =
        condition && condition !== ""
          ? {
              condition: {
                $regex: condition,
                $options: "i",
              },
            }
          : {};
    }

    if (price !== "") {
      var priceFilter =
        price && price !== 0
          ? {
              price: {
                $gte: Number(price.split("-")[0]),
                $lte: Number(price.split("-")[1]),
              },
            }
          : {};
    }

    const filters = {
      ...nameFilter,
      ...directorFilter,
      ...castFilter,
      ...artistFilter,
      ...originFilter,
      ...formatFilter,
      ...rolledFoldedFilter,
      ...conditionFilter,
      ...priceFilter,
    };

    const products = await Product.find({ ...filters })
      .skip(PAGE_SIZE * (pageNumber - 1))
      .limit(PAGE_SIZE);

    const countProducts = await Product.countDocuments({ ...filters });

    res.send({
      products,
      countProducts,
      page: pageNumber,
      pages: Math.ceil(countProducts / PAGE_SIZE),
    });
  })
);

productRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const pageSize = 4;
    const page = req.query.pageNumber || 1;

    const count = await Product.count().exec();

    const products = await Product.find()
      .populate("seller", "seller.name seller.logo")
      .populate("directors")
      .populate("casts")
      .populate("artists");

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
    const seller = await User.findById("62cf285bf46d7258ae45a3c2");
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
      .populate("seller", "seller")
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
  // isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = new Product({
      name: `Poster ${Date.now()}`,
      seller: req.user._id,
      image: "",
      images: [],
      casts: [],
      artists: [],
      origin: "UK",
      year: "2010",
      format: "US Insert",
      condition: "Good",
      rolledFolded: "Rolled",
      countInStock: 10,
      price: 12,
      salePrice: 10,
      description: "Lorem ipsum dore",
      rating: 4,
      numReviews: 10,
      visible: false,
      forSale: false,
      reviews: [],
      directors: [],
    });
    const createdProduct = await product.save();
    res.send({ message: "Product Created", product: createdProduct });
  })
);
productRouter.put(
  "/:id",
  isAuth,
  // isSellerOrAdmin,
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
