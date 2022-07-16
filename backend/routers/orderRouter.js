import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
import Product from "../models/productModel.js";
import {
  isAdmin,
  isAuth,
  isSellerOrAdmin,
  mailgun,
  payOrderEmailTemplate,
} from "../utils.js";
import Session from "../models/sessionModel.js";
import Setting from "../models/settingModel.js";
import Stripe from "stripe";

const orderRouter = express.Router();

orderRouter.get(
  "/",
  isAuth,
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const seller = req.query.seller || "";
    const sellerFilter = seller ? { seller } : {};

    const orders = await Order.find({ ...sellerFilter }).populate(
      "user",
      "name"
    );
    res.send(orders);
  })
);

orderRouter.get(
  "/summary",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.aggregate([
      {
        $group: {
          _id: null,
          numOrders: { $sum: 1 },
          totalSales: { $sum: "$totalPrice" },
        },
      },
    ]);
    const users = await User.aggregate([
      {
        $group: {
          _id: null,
          numUsers: { $sum: 1 },
        },
      },
    ]);
    const dailyOrders = await Order.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          orders: { $sum: 1 },
          sales: { $sum: "$totalPrice" },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    const productCategories = await Product.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
    ]);
    res.send({ users, orders, dailyOrders, productCategories });
  })
);

orderRouter.get(
  "/mine",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
  })
);

orderRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    if (req.body.orderItems.length === 0) {
      res.status(400).send({ message: "Cart is empty" });
    } else {
      const order = new Order({
        seller: req.body.orderItems[0].seller,
        orderItems: req.body.orderItems,
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingCost: req.body.shippingCost,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        allowedToPay: true,
        user: req.user._id,
      });
      const createdOrder = await order.save();
      res
        .status(201)
        .send({ message: "New Order Created", order: createdOrder });
    }
  })
);

orderRouter.get(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
      "seller",
      "name email"
    );
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  })
);

orderRouter.put(
  "/:id/pay",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "email name"
    );
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };
      const updatedOrder = await order.save();
      try {
        mailgun()
          .messages()
          .send(
            {
              from: "Amazona <amazona@mg.yourdomain.com>",
              to: `${order.user.name} <${order.user.email}>`,
              subject: `New order ${order._id}`,
              html: payOrderEmailTemplate(order),
            },
            (error, body) => {
              if (error) {
              } else {
              }
            }
          );
      } catch (err) {}

      res.send({ message: "Order Paid", order: updatedOrder });
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  })
);

orderRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      const deleteOrder = await order.remove();
      res.send({ message: "Order Deleted", order: deleteOrder });
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  })
);

orderRouter.put(
  "/:id/deliver",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updatedOrder = await order.save();
      res.send({ message: "Order Delivered", order: updatedOrder });
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  })
);

orderRouter.put(
  "/:id/allow-to-pay",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.allowedToPay = req.body.allowedToPay;
      order.totalPrice = order.itemsPrice + order.taxPrice;
      const updatedOrder = await order.save();
      res.send({
        message: "Order Shipping Price Updated",
        order: updatedOrder,
      });
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  })
);

orderRouter.post("/create-checkout-session", async (req, res) => {
  const { stripe_private_key } = await Setting.findOne();
  const stripe = new Stripe(stripe_private_key);
  const session = await stripe.checkout.sessions.create({
    line_items: req.body.line_items,
    mode: "payment",
    success_url: `http://localhost:3000/payment/success/session/{CHECKOUT_SESSION_ID}`,
    cancel_url:
      "http://localhost:3000/payment/success/session/{CHECKOUT_SESSION_ID}",
  });
  const new_session = new Session({
    id: session.id,
    url: session.url,
    type: req.body.type,
    period: req.body.period,
    ref: req.body.ref,
    status: "unpaid",
  });
  const createdSession = await new_session.save();
  res.send({ session: createdSession });
});

orderRouter.get("/payment-status/:session_id/:user_id", async (req, res) => {
  const session_id = req.params.session_id;
  const user_id = req.params.user_id;

  const { stripe_private_key } = await Setting.findOne();
  const stripe = new Stripe(stripe_private_key);
  const stripe_session = await stripe.checkout.sessions.retrieve(session_id);
  // select only the adventures name and length
  const session = await Session.findOne(
    { id: session_id },
    "id ref type period"
  ).exec();

  if (session.type === "subscription") {
    const user = await User.findById(user_id);
    user.seller.subscription = session.ref;
    user.seller.subscription_period = session.period;

    user.save();
  } else {
    const order = await Order.findById(session.ref).exec();
    // const order = await Order.findOne({ user: user_id }).exec();
    order.isPaid = true;
    order.paidAt = Date.now();
    await order.save();
  }

  session.status = stripe_session.payment_status;
  await session.save();
  res.send({ session: session });
});

orderRouter.post("/transfer", async (req, res) => {
  const order = await Order.findById(req.body.orderId);

  const { stripe_private_key } = await Setting.findOne();
  const stripe = new Stripe(stripe_private_key);
  const transfer = await stripetransfers.create({
    amount: parseInt(order.totalPrice - order.totalPrice * 0.07),
    currency: "gbp",
    destination: "acct_18LHw7GFDcM4wUS8",
    transfer_group: "seller_transfer",
    source_transaction: order._id,
  });

  res.send({ transfer });
});
export default orderRouter;
