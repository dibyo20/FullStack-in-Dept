const { io } = require("socket.io-client");

const socket = io("http://localhost:3000");

function sendMessage(message) {
    if (!message || !message.trim()) {
        console.log("Message cannot be empty");
        return;
    }

    socket.emit("message", message);
}

socket.on("connect", () => {
    console.log("Connected to server:", socket.id);

    sendMessage("Hello from client!");
    sendMessage("This is a test message.");
});

socket.on("reply", (data) => {
    console.log("Message:", data);
});

socket.once("announcement", (data) => {
    console.log("One-time announcement:", data);
});

socket.onAny((event, ...args) => {
    console.log("Incoming event: ", event, args);
});

socket.onAnyOutgoing((event, ...args) => {
    console.log("Outgoing event: ", event, args);
});

socket.on("disconnect", (reason) => {
    console.log("Disconnected:", reason);
});

socket.on("connect_error", (error) => {
    console.log("Connection error:", error);
});


// Optional: Remove a specific listener
// socket.off("reply");
