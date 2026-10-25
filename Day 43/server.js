const app = require("./src/app.js");
const PORT = process.env.PORT || 3000;

const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
    },
});

//Adapter Maps:
// rooms => 
// {
//     "general": Set(["socket-A", "socket-B"]),
//     "private": Set(["socket-C"])
// }

// sids =>
// {
//     "socket-A" : Set(["general"]),
//     "socket-B": Set(["general"]),
//     "socket-C": Set(["private"])
// }

const adapter = io.of("/").adapter;
console.log("Adapter:", adapter.constructor.name);

io.on("connection", (socket) => {
    console.log("Connected:", socket.id);

    socket.on("joinRoom", async (room) => {
        await socket.join(room);

        console.log("\n--- ROOMS MAP ---");
        console.log([...adapter.rooms.entries()].map(
            ([roomName, socketIds]) => [roomName, [...socketIds]]
        ));

        console.log("\n--- SIDS MAP ---");
        console.log([...adapter.sids.entries()].map(
            ([socketId, rooms]) => [socketId, [...rooms]]
        ));

        socket.emit("joined", `Joined room: ${room}`);
    });

    socket.on("sendToRoom", ({ room, message }) => {
        socket.to(room).emit("message", message)
    });

    socket.on("leaveRoom", async (room) => {
        await socket.leave(room);
        socket.emit("left", `Left room: ${room}`)
    });

});

httpServer.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});