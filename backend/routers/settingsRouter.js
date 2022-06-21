import express from "express";
import expressAsyncHandler from "express-async-handler";
import { isAdmin, isAuth } from "../utils.js";
import data from "../data.js";
import Setting from "../models/settingModel.js";

const settingsRouter = express.Router();

settingsRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const setting = await Setting.find();
    res.send({ setting: setting[0] });
  })
);

settingsRouter.put(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const setting = await Setting.findOne();

    setting.commission = req.body.commission;
    setting.stripe_private_key = req.body.stripe_private_key;
    setting.site_logo = req.body.site_logo;
    setting.site_favicon = req.body.site_favicon;
    setting.site_keywords = req.body.site_keywords;
    const updated_settings = await setting.save();
    res.send({
      message: "Settings Updated",
      settings: updated_settings,
    });
  })
);

settingsRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    // await User.remove({});
    const setting = await Setting.insertMany(data.settings);
    res.send({ setting });
  })
);

export default settingsRouter;
