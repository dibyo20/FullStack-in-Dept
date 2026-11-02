const Question = require("../models/question.model.js");
const Score = require("../models/score.model.js");
const quizState = require("./quizState.js");

function setupQuizSocket(io) {
    io.on("connection", (socket) => {
        console.log("Client connected: ", socket.id);

        socket.on("quiz:join", ({ username }, callback) => {
            if (!username || !username.trim()) {
                return callback({ success: false, message: "Valid username required" });
            }

            socket.data.username = username;
            socket.join("quiz_arena");

            if (!quizState.scores.has(username)) {
                quizState.scores.set(username, 0);
            }

            callback({ success: true, message: `Welcome to the Quiz, ${username}!` });

            io.to("quiz_arena").emit("quiz:player_joined", {
                username,
                totalPlayers: io.sockets.adapter.rooms.get("quiz_arena")?.size || 1
            });
        });

        


    });
}

module.exports = setupQuizSocket;