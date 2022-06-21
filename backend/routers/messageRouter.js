import express from "express";
import expressAsyncHandler from "express-async-handler";

import data from "../data.js";
import Cast from "../models/castModel.js";
import Message from "../models/messageModel.js";
import { isAuth, isSellerOrAdmin } from "../utils.js";

const messageRouter = express.Router();

messageRouter.get(
  "/:order",
  expressAsyncHandler(async (req, res) => {
    const message = await Message.find({ order: req.params.order })
      .populate("user")
      .populate("order")
      .exec();
    res.send(message);
  })
);

messageRouter.get(
  "/unread/all",
  expressAsyncHandler(async (req, res) => {
    const messages = await Message.find({ read: false })
      .populate("user")
      .populate("order")
      .exec();

    res.send({ messages });
  })
);
messageRouter.get(
  "/unread/:order",
  expressAsyncHandler(async (req, res) => {
    const messages = await Message.find({
      order: req.params.order,
      read: false,
    })
      .populate("user")
      .populate("order")
      .exec();

    res.send({ unread: messages.length > 0 });
  })
);

messageRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    const createdMessages = await Message.insertMany(data.messages);
    res.send({ createdMessages });
  })
);

messageRouter.post(
  "/:order/:user",
  isAuth,
  // isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const { order } = req.params;
    const { user } = req.params;
    const { message: text, userInfo } = req.body;

    const message = new Message({
      user,
      message: text,
      order,
      read: userInfo.isSeller ? true : false,
    });
    if (userInfo.isSeller) {
      Message.updateMany(
        { order: order },
        { read: true },
        { multi: true }
      ).exec();
    }

    res.send({ message: "Message Created", message: createdMessage });
  })
);

export default messageRouter;
