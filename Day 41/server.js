const app = require("./src/app.js");
const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
    },
});

io.use((socket, next) => {
    const token = socket.handshake.headers.authorization;

    if (token === "Bearer demo-token") {
        console.log("Authenticated");
        next();
    } else {
        console.log("Unauthorized");
        next(new Error("Unauthorized"));
    }
});

io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);

    socket.on("message", (message) => {
        io.emit("message", {
            sender: socket.id,
            message: message,
        });
    });
});

httpServer.listen(5000, () => {
    console.log("Socket.IO server is running on port 5000");
});