import express from 'express';
import expressAsyncHandler from 'express-async-handler';

import data from '../data.js';
import Director from '../models/directorModel.js';
import { isAuth, isSellerOrAdmin } from '../utils.js';

const directorRouter = express.Router();

directorRouter.get(
 '/',
 expressAsyncHandler(async (req, res) => {
  const directors = await Director.find();
  res.send(directors);
 })
);


directorRouter.get(
 '/seed',
 expressAsyncHandler(async (req, res) => {
  const createdDirectors = await Director.insertMany(data.directors);
  res.send({ createdDirectors });
 })
);

directorRouter.post(
 '/',
 isAuth,
 isSellerOrAdmin,
 expressAsyncHandler(async (req, res) => {
  const director = new Director(req.body.director);
  const createdDirector = await director.save();
  res.send({ message: 'Director Created', director: createdDirector });
 })
);


export default directorRouter
