import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

let onLineUser = [];

const addNewUser = (username, socketId) => {
  if (!onLineUser.some((user) => user.username === username)) {
    onLineUser.push({ username, socketId });
    // console.log(`Added new user: ${username}`);
  } else {
    // console.log(`User ${username} is already connected`);
  }
};

const removeUser = (socketId) => {
  onLineUser = onLineUser.filter((user) => user.socketId !== socketId);
  // console.log(`Removed user with socket ID ${socketId}`);
};

const getUser = (username) => {
  return onLineUser.find((user) => user.username === username);
};

io.on("connection", (socket) => {
  socket.on("newUser", (username) => {
    addNewUser(username, socket.id);
    // console.log(`User ${username} connected with socket ID ${socket.id}`);
  });

  socket.on("sendNotification", ({ senderName, receiverName, type }) => {
    const receiver = getUser(receiverName);
    if (receiver && receiver.socketId) {
      io.to(receiver.socketId).emit("getNotification", {
        senderName,
        type,
      });
      console.log(`Notification sent from ${senderName} to ${receiverName}`);
    } else {
      console.error(`Receiver ${receiverName} not found or missing socketId.`);
    }
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
    console.log(`Socket ${socket.id}} disconnected`);
  });
});

io.listen(5000, () => {
  console.log("Server is running on port 5000");
});
