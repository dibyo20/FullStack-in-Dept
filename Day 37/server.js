const app = require("./src/app.js");
const { createServer } = require("http");
const { Server } = require('socket.io');

const httpServer = createServer(app);
const io = new Server(httpServer, /*Options*/);

io.on('connection', (socket) => {
    console.log('New Connection Created');

    // socket.on("message", (msg) => {
    //     console.log("user sent a message")
    //     console.log(msg)

    //     io.emit("abc")
    // });
});

httpServer.listen(3000, () => {
    console.log("Server is running on port 3000");
});