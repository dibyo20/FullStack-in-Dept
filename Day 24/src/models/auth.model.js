const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Email already exists"]
    },
    password: {
        type: String,
        required: true
    },
})

const authModel = mongoose.model("auth", authSchema);

module.exports = authModel;