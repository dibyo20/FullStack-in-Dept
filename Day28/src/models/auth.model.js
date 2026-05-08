const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
    username: String,
    email: {
        type: String,
        unique: [true, "Email already exists"],
        required: [true, "Email is required"],
    },
    password: String,
});

const authModel = mongoose.model("auths", authSchema);

module.exports = authModel;