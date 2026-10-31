const { createAdapter } = require("@socket.io/redis-adapter");
const express = require("express");
const { createServer } = require("http");
const { createClient } = require("redis");
const { Server } = require("socket.io");

async function startServer(port) {
    const app = express();
    const server = createServer(app);
    const io = new Server(server, { cors: { origin: "*" } });

    const pubClient = createClient({ url: "redis://default:jUypvo1iLfLsMPIr4ZyRHZf0DSQWmoTi@redis-16424.c212.ap-south-1-1.ec2.cloud.redislabs.com:16424", });
    const subClient = pubClient.duplicate();

    pubClient.on("error", (err) => console.log("Redis Pub Client Error", err));
    subClient.on("error", (err) => console.log("Redis Sub Client Error", err));

    await Promise.all([pubClient.connect(), subClient.connect()]);

    io.adapter(createAdapter(pubClient, subClient));

    io.on("connection", (socket) => {
        console.log(`Server ${port}: Connected ${socket.id}`);

        socket.on("joinRoom", async (room) => {
            await socket.join(room);
            socket.emit("joined", `Joined room: ${room}`);
        });

        socket.on("sendToRoom", ({ room, message }) => {
            console.log(`Server ${port}: Broadcasting to ${room}`);
            io.to(room).emit("message", {
                fromServer: port,
                message,
            });
        });

        socket.on("disconnect", () => {
            console.log(`Server ${port}: Disconnected ${socket.id}`);
        });
    });

    server.listen(port, () => {
        console.log(`Server ${port}: Listening on port ${port}`);
    });
}

const port = Number(process.argv[2]) || 3000;

startServer(port);