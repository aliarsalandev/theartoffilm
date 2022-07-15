import express from "express";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import data from "../data.js";
import User from "../models/userModel.js";
import { generateToken, isAdmin, isAuth, isSeller } from "../utils.js";
import Stripe from "stripe";
import Setting from "../models/settingModel.js";

const userRouter = express.Router();

userRouter.get(
  "/top-sellers",
  expressAsyncHandler(async (req, res) => {
    const topSellers = await User.find({ isSeller: true })
      .sort({ "seller.rating": -1 })
      .limit(3);
    res.send(topSellers);
  })
);

userRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    // await User.remove({});
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
  })
);

userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          isSeller: user.isSeller,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: "Invalid email or password" });
  })
);

userRouter.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    const { stripe_private_key } = await Setting.findOne();
    const stripe = new Stripe(stripe_private_key);
    try {
      const account = await stripe.accounts.create({
        type: "custom",
        email: req.body.email,
        business_type: "individual",
        capabilities: {
          card_payments: { requested: true },
          transfers: { requested: true },
        },
        metadata: {
          name: req.body.name,
        },
      });
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        seller:
          {
            ...req.body.seller,
            stripe_account_id: account.id,
          } ?? {},
        isSeller: req.body.isSeller ?? true,
      });

      const createdUser = await user.save();
      res.send({
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        seller: createdUser.seller,
        isAdmin: createdUser.isAdmin,
        isSeller: user.isSeller,
        token: generateToken(createdUser),
      });
    } catch (error) {
      res.send({
        error,
      });
    }
  })
);

userRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  })
);

userRouter.get(
  "/:id/subscription",
  expressAsyncHandler(async (req, res) => {
    const { seller } = await User.findById(req.params.id).populate(
      "seller.subscription"
    );

    if (seller) {
      res.send({
        subscription: seller.subscription,
        period: seller.subscription_period,
      });
    } else {
      res.status(404).send({ message: "Subscription Not Found" });
    }
  })
);

userRouter.put(
  "/profile",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      const { stripe_private_key } = await Setting.findOne();
      const stripe = new Stripe(stripe_private_key);
      account = await stripe.accounts.create({
        type: "custom",
        email: req.body.email,
        business_type: "individual",
        business_profile: {
          url: "https://www.example.com",
          support_address: {
            line1: "123 Main Street",
            line2: "Suite 800",
            city: "San Francisco",
            state: "CA",
            postal_code: "94107",
            country: "US",
          },
        },

        individual: {
          email: req.body.email,
          first_name: req.body.name.split(" ")[0],
          last_name: req.body.name.split(" ")[1] ?? "",
          dob: {
            day: 1,
            month: 1,
            year: 1970,
          },
          phone: "555-867-5309",
        },
        external_account: {
          object: "bank_account",
          country: "US",
          currency: "usd",
          account_holder_name: req.body.name,
          account_holder_type: "individual",
          routing_number: req.body.routing_number,
          account_number: req.body.account_number,
        },

        settings: {
          card_issuing: {
            tos_acceptance: {
              date: Math.floor(Date.now() / 1000),
              ip: req.body.ip,
            },
          },
        },
        capabilities: {
          card_payments: { requested: true },
          transfers: { requested: true },
        },
        metadata: {
          name: req.body.name,
        },
      });

      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.address = req.body.address || user.address;
      user.city = req.body.city || user.city;
      user.postalCode = req.body.postalCode || user.postalCode;
      user.country = req.body.country || user.country;

      user.seller.name = req.body.seller.name || user.seller.name;
      user.seller.logo = req.body.seller.logo || user.seller.logo;
      user.seller.stripe_account_id =
        req.body.seller.stripe_account_id || user.seller.stripe_account_id;
      user.seller.description =
        req.body.seller.description || user.seller.description;

      user.seller.shipping_cost =
        req.body.seller.shipping_cost || user.seller.shipping_cost;

      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        isSeller: user.isSeller,
        token: generateToken(updatedUser),
      });
    }
  })
);

userRouter.get(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const users = await User.find({});
    res.send(users);
  })
);

userRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      if (user.email === "admin@example.com") {
        res.status(400).send({ message: "Can Not Delete Admin User" });
        return;
      }
      const deleteUser = await user.remove();
      res.send({ message: "User Deleted", user: deleteUser });
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  })
);

userRouter.put(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.isSeller = Boolean(req.body.isSeller);
      user.isAdmin = Boolean(req.body.isAdmin);
      // user.isAdmin = req.body.isAdmin || user.isAdmin;
      const updatedUser = await user.save();
      res.send({ message: "User Updated", user: updatedUser });
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  })
);

export default userRouter;
