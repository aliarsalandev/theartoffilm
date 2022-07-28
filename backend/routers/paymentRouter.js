import express from "express";
import expressAsyncHandler from "express-async-handler";
import { isAdmin, isAuth, isSeller } from "../utils.js";
import data from "../data.js";
import Setting from "../models/settingModel.js";
import Payment from "../models/paymentModel.js";
import Stripe from "stripe";
import User from "../models/userModel.js";

const paymentRouter = express.Router();

paymentRouter.get(
  "/:email",
  expressAsyncHandler(async (req, res) => {
    const { email } = req.params;

    // const { stripe_private_key } = await Setting.findOne();
    // const stripe = new Stripe(stripe_private_key);

    const user = await User.findOne({ email });

    // const account_info = await stripe.accounts.retrieve(stripe_account_id);

    const payment_info = await Payment.findOne({
      user: user._id,
    });

    // const details_submitted = account_info.details_submitted;

    res.send({
      payment_info: {
        account_info: {
          routing_number: payment_info.routing_number,
          account_number: payment_info.account_number,
          country: payment_info.country,
          paypal_email: payment_info.paypal_email,
          currency: payment_info.currency,
        },
      },
    });

  })
);

paymentRouter.put(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    console.log(req.body);
    const { routing_number, account_number, country, currency, paypal_email } =
      req.body.bank_account;

    try {
      const user = await User.findById(req.body.user.id);
      const { _id, seller } = user;
      const payment_info = await Payment.findOne({
        user: _id,
      });

      const { stripe_private_key } = await Setting.findOne();
      // const stripe = new Stripe(stripe_private_key);
      // const account_info = await stripe.accounts.update(stripe_account_id, {
      //   external_account: {
      //     object: "bank_account",
      //     routing_number,
      //     account_number,
      //     country,
      //     currency,
      //   },
      // });

      if (payment_info) {
        await Payment.findByIdAndUpdate(payment_info._id, {
          routing_number,
          account_number,
          country,
          currency,
          paypal_email
        });
      } else {
        const newPayment = new Payment({
          user: _id,
          routing_number,
          account_number,
          country,
          currency,
          paypal_email,
        });
        await newPayment.save();
      }

      // const details_submitted = account_info.details_submitted;

      res.send({
        payment_info: {
          account_info: { routing_number, account_number, country, currency },
          account_link: "",
        },
        message: "Payment Information Updated",
      });

    } catch (error) {
      console.log(error);
      res.send({
        error,
      });
    }
  })
);

paymentRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    // await User.remove({});
    const setting = await Setting.insertMany(data.settings);
    res.send({ setting });
  })
);

export default paymentRouter;
