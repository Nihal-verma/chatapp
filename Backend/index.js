

const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const rateLimit = require("express-rate-limit"); 
const { query, validationResult } = require('express-validator');

const PORT = 3000;
const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const postRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10,
  message: { success: false, message: "Too many requests, please try again later." }
});


io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);
//     // io.emit("message-received",data) // this will give message to evry one
//     // socket.broadcast.emit("message-received",data)
  socket.on("message", ({ room, message }) => {
    // console.log(`Message from ${socket.id}: ${message} (Room: ${room})`);
    io.to(room).emit("message-received", [message, socket.id]);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected:", socket.id);
  });
});

app.use(cors());

app.use(postRateLimiter) // can pass it as app level middleware or can use it in route for each api
app.get("/", (req, res) => {
  res.json("Hello, server is running.");
});
app.post("/create", (req, res) => {
  let data = req.body;
  res.json({ message: "Message received", success: true, data });
})

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//  new comment for test git
// const express = require("express");
// const { createServer } = require("http");
// const { Server } = require("socket.io");
// const cors = require("cors");

// const PORT = 3000;
// const app = express();
// const server = new createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"],
//     credentials: true,
//   },
// });

// io.on("connect", (socket) => {
//   socket.on("message", ({room,message}) => {
   

//     console.log("inside", socket.id);
//     io.to(room).emit("message-received",[message,socket.id])
//   });
//   console.log("Listen TO ", socket.id);
//   // socket.emit("welcome",`welcome to the server ${socket.id}`)
//   // socket.broadcast.emit("welcome",`welcome to the server ${socket.id}`)
//   socket.on("disconnect", () => {
//     console.log("User Disconnected", socket.id);
//   });
// });
// app.use(cors());
// app.get("/", (req, res) => {
//   res.json("hello");
// });

// server.listen(PORT, () => {
//   console.log(`running on port ${PORT}`);
// });