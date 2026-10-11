const app = require('./src/app.js');
const { createServer } = require('http');
const { Server } = require('socket.io');

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
    }
});

const customer = io.of('/customer');
const agent = io.of('/agent');
const admin = io.of('/admin');

customer.use((socket, next) => {
    const token = socket.handshake.headers.authorization;
    if (token == "demo-customer") {
        console.log("customer Authorized");
        next();
    } else {
        console.log("Unauthorized");
        next(new Error("Unauthorized"));
    }
});

agent.use((socket, next) => {
    const token = socket.handshake.headers.authorization;
    if (token == "demo-agent") {
        console.log("agent Authorized");
        next();
    } else {
        console.log("Unauthorized");
        next(new Error("Unauthorized"));
    }
});

admin.use((socket, next) => {
    const token = socket.handshake.headers.authorization;
    if (token == "demo-admin") {
        console.log("admin Authorized");
        next();
    } else {
        console.log("Unauthorized");
        next(new Error("Unauthorized"));
    }
});

customer.on('connection', (socket) => {
    console.log("Customer Connected: ", socket.id);

    socket.on("customer", (message) => {
        customer.emit("customer", { sender: socket.id, message: message });
        agent.emit("customer", { sender: socket.id, message: message });
    });
});

agent.on('connection', (socket) => {
    console.log("Agent Connected: ", socket.id);

    socket.on("agent", (message) => {
        customer.emit("agent", { sender: socket.id, message: message });
        agent.emit("agent", { sender: socket.id, message: message });
    });
});

admin.on('connection', (socket) => {
    console.log("Admin Connected: ", socket.id);

    socket.on("admin", (message) => {
        customer.emit("admin", { sender: socket.id, message: message });
        agent.emit("admin", { sender: socket.id, message: message });
    });
});

httpServer.listen(3000, () => {
    console.log("Server is running on port 3000");
})