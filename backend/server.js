import http from "http";

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import productRouter from "./routers/productRouter.js";
import userRouter from "./routers/userRouter.js";
import orderRouter from "./routers/orderRouter.js";
import uploadRouter from "./routers/uploadRouter.js";
import directorRouter from "./routers/directorRouter.js";
import castRouter from "./routers/castRouter.js";
import artistRouter from "./routers/artistRouter.js";
import sellerRouter from "./routers/sellerRouter.js";
import subscriptionRouter from "./routers/subscriptionRouter.js";
import sessionRouter from "./routers/sessionRouter.js";
import settingsRouter from "./routers/settingsRouter.js";
import cors from "cors";
import {
  addUser,
  removeUser,
  getUser,
  getUsersOfRoom,
} from "./data/chat-users.js";
import messageRouter from "./routers/messageRouter.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(
  process.env.MONGODB_URL || "mongodb://localhost/theartoffilms"
);
app.use("/api/uploads", uploadRouter);
app.use("/api/users", userRouter);
app.use("/api/sellers", sellerRouter);
app.use("/api/subscriptions", subscriptionRouter);
app.use("/api/products", productRouter);
app.use("/api/directors", directorRouter);
app.use("/api/casts", castRouter);
app.use("/api/artists", artistRouter);
app.use("/api/orders", orderRouter);
app.use("/api/messages", messageRouter);
app.use("/api/sessions", sessionRouter);
app.use("/api/settings", settingsRouter);
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});
app.get("/api/config/google", (req, res) => {
  res.send(process.env.GOOGLE_API_KEY || "");
});
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use(express.static(path.join(__dirname, "/frontend/build")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/frontend/build/index.html"))
);
// app.get('/', (req, res) => {
//   res.send('Server is ready');
// });

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;

const httpServer = http.Server(app);

app.use(cors());

httpServer.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
