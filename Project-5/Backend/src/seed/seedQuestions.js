require("dotenv").config();
const mongoose = require("mongoose");
const Question = require("../models/question.model");

const sampleQuestions = [
    {
        order: 1,
        questionText: "Which protocol does WebSocket use for its initial handshake?",
        options: ["HTTP", "FTP", "SMTP", "UDP"],
        correctAnswer: "HTTP",
        points: 10
    },
    {
        order: 2,
        questionText: "Which Socket.IO method broadcasts to all clients except the sender?",
        options: ["io.emit()", "socket.broadcast.emit()", "socket.emit()", "io.to().emit()"],
        correctAnswer: "socket.broadcast.emit()",
        points: 10
    },
    {
        order: 3,
        questionText: "What MongoDB method finds a single document by its unique identifier?",
        options: ["findById", "getOne", "searchById", "findOneById"],
        correctAnswer: "findById",
        points: 10
    }
];

async function seed() {
    await mongoose.connect(process.env.MONGO_URI);
    await Question.deleteMany({});
    await Question.insertMany(sampleQuestions);
    console.log("Database seeded successfully!");
    process.exit();
}

seed();