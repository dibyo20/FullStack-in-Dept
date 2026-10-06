require("dotenv").config();
const app = require("./src/app.js");
const PORT = process.env.PORT || 5000;

const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: "*",
    }
});

io.on("connection", (socket) => {
    console.log("Connected: ", socket.id);

    socket.on("login", (username, callback) => {
        if (!username) {
            callback({
                success: false,
                message: "Please enter a username"
            });
            return;
        }

        callback({
            success: true,
            message: "Successfully logged in",
            username,
        });
    });

    socket.on("joinRoom", (roomName, callback) => {
        socket.join(roomName);

        callback({
            success: true,
            message: `Joined: ${roomName}`,
        });
    });

    socket.on("roomMessage", ({ roomName, message }) => {
        io.to(roomName).emit("roomMessage", {
            roomName: roomName,
            sender: socket.id,
            message: message,
        });
    });

    socket.on("roomMessageOthers", ({ roomName, message }) => {
        socket.to(roomName).emit("roomMessage", {
            sender: socket.id,
            message: message,
        });
    });

    socket.on("leaveRoom", ({ roomName, callback }) => {
        socket.leave(roomName);

        callback({
            success: true,
            message: `Left: ${roomName}`,
        });
    });

    socket.on("privateMessage", ({ receiverId, message }) => {
        io.to(receiverId).emit("privateMessage", {
            sender: socket.id,
            message: message,
        });
    });

    socket.on("disconnect", () => {
        console.log("Disconnected: ", socket.id);
    });
});

httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});