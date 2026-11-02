const { io } = require("socket.io-client");
const socket = io("http://localhost:3000");

socket.on("announcement:quiz_start", (data) => {
    console.log("POPUP NOTIFICATION RECEIVED:", data.message);

    socket.emit("quiz:join", { username: "Alice" }, (res) => {
        console.log("Join response:", res.message);
    });
});

socket.on("question:new", (q) => {
    console.log(`\n[Question ${q.order}]: ${q.questionText}`);
    console.log("Options:", q.options);

    console.log("Alice is pressing the buzzer!");
    socket.emit("buzzer:press", {}, (ack) => {
        console.log("Buzzer Result:", ack);
        if (ack.success) {
            setTimeout(() => {
                socket.emit("answer:submit", { selectedAnswer: "HTTP" }, (ansAck) => {
                    console.log("Answer Result:", ansAck);
                });
            }, 2000);
        }
    });
});

socket.on("buzzer:locked", (data) => {
    console.log(`Buzzer locked by ${data.winnerName}!`);
});

socket.on("answer:result", (res) => {
    console.log("Round Result:", res);
});