import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { isAuth } from '../utils.js';
import Advertise from '../models/advertiseModel.js';
import Stripe from 'stripe';
import Setting from '../models/settingModel.js';
import Session from '../models/sessionModel.js';

const advertiseRouter = express.Router();

advertiseRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const advertisements = await Advertise.find({ active: true });
    res.send({ advertisements });
  })
);

advertiseRouter.put(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const advertisment = req.body.advertise;
    try {
      console.log('put', advertisment);

      const advertise = await Advertise.findByIdAndUpdate(advertisment._id, {
        ...advertisment,
      });
      res.send({ advertise });
    } catch (error) {
      console.log(error);
      res.send({
        error,
      });
    }
  })
);

advertiseRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const { title, image, type } = req.body;
    try {
      const advertise = await Advertise.create({
        title,
        image,
        type,
      });
      res.send({ advertise });
    } catch (error) {
      console.log(error);
      res.send({
        error,
      });
    }
  })
);

advertiseRouter.delete(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
      const advertise = await Advertise.findByIdAndDelete(id);
      res.send({ advertise });
    } catch (error) {
      console.log(error);
      res.send({
        error,
      });
    }
  })
);

advertiseRouter.patch(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, image, type } = req.body;
    try {
      const advertise = await Advertise.findByIdAndUpdate(id, {
        title,
        image,
        type,
      });
      res.send({ advertise });
    } catch (error) {
      console.log(error);
      res.send({
        error,
      });
    }
  })
);

advertiseRouter.post(
  '/create-checkout-session',
  expressAsyncHandler(async (req, res) => {
    try {
      const amount = 1000;
      const { title } = req.body?.advertisement;
      const advertisement = await Advertise.create({
        ...req.body.advertisement,
        user: req.body.user_id,
      });

      const { stripe_private_key } = await Setting.findOne();
      const stripe = new Stripe(stripe_private_key);

      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: 'gbp',
              product_data: {
                name: title,
              },
              unit_amount: +amount,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${process.env.STRIPE_SUCCESS_URL}`,
        cancel_url: `${process.env.STRIPE_SUCCESS_URL}`,
      });

      const new_session = new Session({
        id: session.id,
        url: session.url,
        type: 'advertisement',
        period: 'month',
        ref: advertisement._id,
        status: 'unpaid',
      });
      const createdSession = await new_session.save();
      res.send({ session: createdSession });
    } catch (error) {
      console.log(error);
      res.send({
        error,
      });
    }
  })
);

export default advertiseRouter;
