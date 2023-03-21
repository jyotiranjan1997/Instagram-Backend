
const express = require("express");
const cors = require("cors");
const app = express();
const { connect } = require("./src/config/db");
const { userRoute } = require("./src/routes/user");
const { PostRoute } = require("./src/routes/post");
const { followerRoute } = require("./src/routes/follwers");
const { commentRoute } = require("./src/routes/comment");
const { messegeRoute } = require("./src/routes/messege");
const { conversationRoute } = require("./src/routes/conversation");
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Routes
app.use("/user", userRoute);
app.use("/post", PostRoute);
app.use("/comment", commentRoute);
app.use("/follow", followerRoute);
app.use("/messege", messegeRoute);
app.use("/conversation", conversationRoute);

const server = app.listen(PORT, async () => {
  await connect();
  console.log(`listening at http://localhost:${PORT}`);
});

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "https://instaaagrammclonee.netlify.app",
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  //when ceonnect
  console.log("a user connected.");

  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    io.to(user.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
