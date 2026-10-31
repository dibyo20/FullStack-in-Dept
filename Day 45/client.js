const { io } = require("socket.io-client");

const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log("Connected to server");
  console.log("Socket ID:", socket.id);
  console.log("Connected:", socket.connected);

  socket.emit("joinRoom", "general");
});

socket.on("joined", (message) => {
  console.log(message);
});

socket.on("message", (data) => {
  console.log("Room message:", data);
});

socket.on("connect_error", (error) => {
  console.log("Connection error:", error);
});

socket.on("disconnect", (reason) => {
  console.log("Disconnected from server", reason);
});