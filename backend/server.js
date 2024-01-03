require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const route = require("./src/route/routes");
const webhookRoute = require("./src/route/stripeWebhook");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

const router = express.Router();
app.use(router);
route(app, router);
app.use("/api", webhookRoute);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_BASE_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ["websocket", "polling"],
});

var users = [];

const addUser = (userId, socketId, callback) => {
  const userExists = users.some((user) => user.userId === userId);
  if (!userExists) {
    users.push({ userId, socketId });
    console.log("User added successfully. Users after adding:", users);
    if (callback && typeof callback === "function") {
      callback(users); // Invoke the callback with the updated users array
    }
  } else {
    console.log("User already exists. Users:", users);
  }
};

const removeUser = (socketId, callback) => {
  users = users.filter((user) => user.socketId !== socketId);
  if (callback && typeof callback === "function") {
    callback(users); // Invoke the callback with the updated users array
  }
};

const getUser = (userId) => {
  console.log(users + " in get user");
  console.log("Requested userId:", userId);
  const usersArray = Object.values(users);
  console.log(usersArray);

  const user = usersArray.find((user) => {
    console.log(user.userId + " u.uid vs uid " + userId);
    return parseInt(user.userId) === parseInt(userId);
  });

  if (user && user.socketId) {
    console.log("Found user:", user);
    return { userId: user.userId, socketId: user.socketId };
  } else {
    console.log("User not found or missing socketId.", users);
    return null;
  }
};

io.on("connection", (socket) => {
  console.log("a user connected.");

  // take socket and user id
  socket.on("addUser", (userId) => {
    console.log("addUser event received. userId:", userId);
    addUser(userId, socket.id, (updatedUsers) => {
      io.emit("getUsers", updatedUsers);
      console.log("Users after addUser event:", updatedUsers);
    });
  });

  console.log("Current users:", users);

  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    try {
      const user = getUser(receiverId);
      console.log(receiverId + " and user: " + JSON.stringify(user));
      if (user && user.socketId) {
        io.to(user.socketId).emit("getMessage", {
          senderId,
          text,
        });

        console.log(senderId, text);
      } else {
        console.log("User not found or missing socketId.");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  });

  // when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected! Socket ID:", socket.id);
    removeUser(socket.id, (updatedUsers) => {
      io.emit("getUsers", updatedUsers);
      console.log("Users after disconnect event:", updatedUsers);
    });
  });
});

const port = process.env.PORT || 8081;
server.listen(port, function () {
  console.log(`App listening on port ${port}`);
});
