const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
    {
        questionText: {
            type: String, required: true
        },
        options: [
            {
                type: String, required: true
            }
        ],
        correctAnswer: {
            type: String, required: true
        },
        points: {
            type: Number, default: 10
        },
        order: {
            type: Number, required: true
        }
    }
);

module.exports = mongoose.model("question", questionSchema);