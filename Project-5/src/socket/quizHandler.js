const Question = require("../models/question.model.js");
const Score = require("../models/score.model.js");
const quizState = require("./quizState.js");

function setupQuizSocket(io) {
    io.on("connection", (socket) => {
        console.log("Client connected: ", socket.id);

        
    });
}

module.exports = setupQuizSocket;