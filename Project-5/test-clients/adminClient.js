const { io } = require("socket.io-client");
const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log("Admin connected:", socket.id);

  socket.emit("admin:start_quiz", {}, (res) => {
    console.log("Quiz Start Response:", res);

    setTimeout(() => {
      socket.emit("admin:next_question", {}, (qRes) => {
        console.log("Question 1 Sent:", qRes);
      });
    }, 3000);
  });
});