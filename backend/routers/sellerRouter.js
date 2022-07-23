import express from "express";
import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const sellerRouter = express.Router();

sellerRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const sellers = await User.find({ isSeller: true });
    res.send(sellers);
  })
);

export default sellerRouter;
