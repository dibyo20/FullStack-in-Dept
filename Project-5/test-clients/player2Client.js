const { io } = require("socket.io-client");
const socket = io("http://localhost:3000");

socket.on("announcement:quiz_start", (data) => {
    console.log("Bob received announcement:", data.message);
    socket.emit("quiz:join", { username: "Bob" }, (res) => {
        console.log("Bob join response:", res.message);
    });
});

socket.on("question:new", (q) => {
    console.log(`\n[Bob Question ${q.order}]: ${q.questionText}`);

    setTimeout(() => {
        console.log("⚡ Bob is trying to press buzzer");
        socket.emit("buzzer:press", {}, (ack) => {
            console.log("Bob Buzzer Result:", ack);
        });
    }, 200);
});

socket.on("buzzer:locked", (data) => {
    console.log(`Buzzer locked by ${data.winnerName}!`);
});

socket.on("answer:result", (res) => {
    console.log("Round Result:", res);
});