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

        socket.on("admin:next_question", async (data, callback) => {
            if (quizState.buzzerLockTimer) {
                clearTimeout(quizState.buzzerLockTimer);
                quizState.buzzerLockTimer = null;
            }

            quizState.currentQuestionIndex += 1;

            const question = await Question.findOne({ order: quizState.currentQuestionIndex });

            if (!question) {
                quizState.status = "ENDED";
                return io.to("quiz_arena").emit("quiz:ended", {
                    message: "Quiz has ended! Check the leaderboard for the results.",
                    leaderboard: Array.from(quizState.scores.entries()).map(([username, score]) => ({ username, score }))
                });
            }

            quizState.currentQuestion = question;
            quizState.status = "QUESTION_ACTIVE";
            quizState.buzzerWinner = null;

            io.to("quiz_arena").emit("question:new", {
                order: question.order,
                questionText: question.questionText,
                options: question.options,
                points: question.points
            });

            callback({ success: true, questionOrder: question.order });
        });

        


    });
}

module.exports = setupQuizSocket;