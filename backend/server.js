import http from "http";
import { Server, Socket } from "socket.io";

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

const io = new Server(httpServer, { cors: { origin: "*" } });
app.use(cors());

io.on("connection", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    socket.join(user.room);

    //admin generated messages are called 'message'
    //welcome message for user
    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to the room ${user.room}`,
    });

    //message to all the users of that room except the newly joined user
    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name} has joined` });

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersOfRoom(user.room),
    });

    callback();
  });

  //user generated message are called 'sendMessage'
  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit("message", { user: user.name, text: message });
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersOfRoom(user.room),
    });

    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit("message", {
        user: "admin",
        text: `${user.name} has left.`,
      });
    }
  });
});

httpServer.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});

// app.listen(port, () => {
//   console.log(`Serve at http://localhost:${port}`);
// });
