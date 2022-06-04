import express from 'express';
import expressAsyncHandler from 'express-async-handler';

import data from '../data.js';
import Cast from '../models/castModel.js';
import { isAuth, isSellerOrAdmin } from '../utils.js';

const castRouter = express.Router();

castRouter.get(
 '/',
 expressAsyncHandler(async (req, res) => {
  const casts = await Cast.find();
  res.send(casts);
 })
);


castRouter.get(
 '/seed',
 expressAsyncHandler(async (req, res) => {
  const createdCasts = await Cast.insertMany(data.casts);
  res.send({ createdCasts });
 })
);

castRouter.post(
 '/',
 isAuth,
 isSellerOrAdmin,
 expressAsyncHandler(async (req, res) => {
  const cast = new Cast(req.body.cast);
  const createdCast = await cast.save();
  res.send({ message: 'Cast Created', cast: createdCast });
 })
);


export default castRouter
