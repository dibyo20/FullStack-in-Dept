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

        socket.on("admin:start_quiz", async (data, callback) => {
            quizState.status = "ACTIVE";
            quizState.currentQuestionIndex = 0;

            io.emit("announcement:quiz_start", {
                message: "A new Quiz is starting right now! Click to enter the arena.",
                category: "Web Development & Sockets"
            });

            callback({ success: true, message: "Quiz started and popup broadcasted!" });
        });


    });
}

module.exports = setupQuizSocket;