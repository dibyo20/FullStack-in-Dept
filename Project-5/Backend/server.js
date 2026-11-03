require("dotenv").config();
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const connectDB = require("./src/config/db");
const setupQuizSocket = require("./src/socket/quizHandler");

const app = express();
app.use(express.json());

const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: { origin: "*" }
});

app.set("io", io);

setupQuizSocket(io);

const PORT = process.env.PORT || 3000;
connectDB().then(() => {
    httpServer.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
});