import express from "express";
import expressAsyncHandler from "express-async-handler";
import { isAdmin, isAuth } from "../utils.js";
import Subscription from "../models/subscriptionModel.js";
import data from "../data.js";

const subscriptionRouter = express.Router();

subscriptionRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const subscriptions = await Subscription.find();
    res.send(subscriptions);
  })
);

subscriptionRouter.post(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const { name, image, monthPrice, yearPrice, posters, posterImages } =
      req.body;
    const subscription = new Subscription({
      name,
      image,
      monthPrice,
      yearPrice,
      posters,
      posterImages,
    });
    const createdSubscription = await subscription.save();
    res.send({ subscription: createdSubscription });
    res.status(200).send({
      message: "Subscription Created",
      subscription: createdSubscription,
    });
  })
);

subscriptionRouter.put(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const subscriptionId = req.params.id;
    const subscription = await Subscription.findById(subscriptionId);
    if (subscription) {
      subscription.name = req.body.name;
      subscription.image = req.body.image;
      subscription.monthPrice = req.body.monthPrice;
      subscription.yearPrice = req.body.yearPrice;
      subscription.posters = req.body.posters;
      subscription.posterImages = req.body.posterImages;

      const updatedSubscription = await subscription.save();
      res.send({
        message: "Subscription Updated",
        subscription: updatedSubscription,
      });
    } else {
      res.status(404).send({ message: "Subscription Not Found" });
    }
  })
);

subscriptionRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const subscription = await Subscription.findById(req.params.id);
    if (subscription) {
      const deletedSubscription = await subscription.remove();
      res.send({
        message: "Subscription Deleted",
        subscription: deletedSubscription,
      });
    } else {
      res.status(404).send({ message: "Subscription Not Found" });
    }
  })
);

subscriptionRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    // await User.remove({});
    const createdSubscription = await Subscription.insertMany(
      data.subscriptions
    );
    res.send({ subscriptions: createdSubscription });
  })
);

subscriptionRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const subscription = await Subscription.findById(req.params.id);
    if (subscription) {
      res.send(subscription);
    } else {
      res.status(404).send({ message: "Subscription Not Found" });
    }
  })
);

export default subscriptionRouter;
