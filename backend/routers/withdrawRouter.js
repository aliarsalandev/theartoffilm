import express from "express";
import expressAsyncHandler from "express-async-handler";
import Withdraw from "../models/withdrawModel.js";
import { isAuth } from "../utils.js";

const withdrawRouter = express.Router();

withdrawRouter.get(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const withdraws = await Withdraw.find()
        .where("status", "unpaid")
        .populate("user", "name email");
      res.send({ withdraws });
    } catch (error) {
      console.log(error);
      res.send({
        error,
      });
    }
  })
);
withdrawRouter.get(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const { id: user } = req.params;
    try {
      const withdraws = await Withdraw.find({ user }).where("status", "unpaid");
      res.send({ withdraws });
    } catch (error) {
      console.log(error);
      res.send({
        error,
      });
    }
  })
);

withdrawRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const { user, amount, currency } = req.body;
    try {
      const withdraw = await Withdraw.create({
        user,
        amount,
        currency,
      });
      res.send({
        withdraw,
      });
    } catch (error) {
      console.log(error);
      res.send({
        error,
      });
    }
  })
);

withdrawRouter.put(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    console.log(req.body);
    const { id } = req.params;
    const { status } = req.body;
    try {
      const withdraw = await Withdraw.findByIdAndUpdate(id, { status });
      res.send({
        withdraw,
      });
    } catch (error) {
      console.log(error);
      res.send({
        error,
      });
    }
  })
);

export default withdrawRouter;
