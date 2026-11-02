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

        socket.on("buzzer:press", (data, callback) => {
            if (quizState.status !== "QUESTION_ACTIVE") {
                return callback({ success: false, message: "Buzzer is not active!" });
            }

            if (quizState.buzzerWinner !== null) {
                return callback({
                    success: false,
                    message: `Too slow! ${quizState.buzzerWinner.username} buzzed first.`
                });
            }

            quizState.status = "BUZZER_LOCKED";
            quizState.buzzerWinner = {
                socketId: socket.id,
                username: socket.data.username
            };

            callback({ success: true, message: "You got the buzzer! Submit your answer." });

            io.to("quiz_arena").emit("buzzer:locked", {
                winnerName: socket.data.username,
                winnerId: socket.id,
                timeLimit: 10
            });

            quizState.buzzerTimeout = setTimeout(() => {
                if (quizState.status === "BUZZER_LOCKED") {
                    console.log(`Time out for ${socket.data.username}`);
                    quizState.buzzerWinner = null;
                    quizState.status = "QUESTION_ACTIVE";

                    io.to("quiz_arena").emit("buzzer:unlocked", {
                        reason: "Buzzer is open reopened for others.",
                    });
                }
            }, 10000);
        });

        socket.on("answer:submit", async ({ selectedAnswer }, callback) => {
            if (!quizState.buzzerWinner || quizState.buzzerWinner.socketId !== socket.id) {
                return callback({ success: false, message: "You do not have the buzzer lock!" });
            }

            const isCorrect = selectedAnswer === quizState.currentQuestion.correctAnswer;
            const username = socket.data.username;

            if (isCorrect) {
                const currentScore = quizState.scores.get(username) || 0;
                const newScore = isCorrect ? (currentScore + quizState.currentQuestion.points) : 0;
                quizState.scores.set(username, newScore);

                await Score.findOneAndUpdate(
                    { username },
                    { $inc: { score: quizState.currentQuestion.points, correctAnswersCount: 1 } },
                    { upsert: true, new: true }
                );
            }

            io.to("quiz_arena").emit("answer:result", {
                isCorrect,
                username,
                correctAnswer: quizState.currentQuestion.correctAnswer,
                leaderboard: Array.from(quizState.scores.entries()).map(([user, pts]) => ({ username: user, score: pts }))
            });

            quizState.buzzerWinner = null;
            quizState.status = "IDLE";

            callback({ success: true, isCorrect });
        });


    });
}

module.exports = setupQuizSocket;