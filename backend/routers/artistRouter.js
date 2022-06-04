import express from 'express';
import expressAsyncHandler from 'express-async-handler';

import data from '../data.js';
import Artist from '../models/artistModel.js';
import { isAuth, isSellerOrAdmin } from '../utils.js';

const artistRouter = express.Router();


artistRouter.get(
 '/',
 expressAsyncHandler(async (req, res) => {
  const artists = await Artist.find();
  res.send(artists);

 })
);


artistRouter.get(
 '/seed',
 expressAsyncHandler(async (req, res) => {
  const createdArtists = await Artist.insertMany(data.artists);
  res.send({ createdArtists });
 })
);

artistRouter.post(
 '/',
 isAuth,
 isSellerOrAdmin,
 expressAsyncHandler(async (req, res) => {
  const artist = new Artist(req.body.artist);
  const createdArtist = await artist.save();
  res.send({ message: 'Artist Created', artist: createdArtist });
 })
);


export default artistRouter
