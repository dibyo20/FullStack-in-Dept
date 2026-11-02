const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

io.on("connection", (socket) => {
    console.log("CLIENT CONNECTED");
    console.log("Socket ID: ", socket.id);

    socket.on("message", (data) => {
        console.log("Message: ", data);

        socket.emit("reply", "Message received successfully");
        socket.emit("announcement", "Welcome to our chat!");
    });


    socket.on("disconnect", () => {
        console.log("Client Disconnected:", socket.id);
    });
});

server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});