const app = require("./src/app.js");
const PORT = process.env.PORT || 3000;

const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(app);
const io = new Server(httpServer);

console.log(io.of("/").adapter.constructor.name);

io.on("connection", (socket) => {
    console.log("Client connected", socket.id);

    socket.on("joinRoom", (room) => {
        socket.join(room);
        console.log(`Client ${socket.id} joined room ${room}`);
    });

    socket.on("roomMessage", ({ room, message }) => {
        io.to(room).emit("roomMessage", {
            sender: socket.id,
            message: message,
        });
    });
})

httpServer.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})