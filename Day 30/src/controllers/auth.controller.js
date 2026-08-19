const userModel = require("../models/user.model.js");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

async function register(req, res) {
    const { username, email, password } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = crypto
        .createHash("md5")
        .update(password)
        .digest("hex");

    const user = await userModel.create({
        username,
        email,
        password: hashedPassword,
    });

    console.log(user);

    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });

    res.cookie("token", token);

    res.status(201).json({
        message: "User registered successfully",
        user: user,
    });
}

async function login(req, res) {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }

    const hashedPassword = crypto
        .createHash("md5")
        .update(password)
        .digest("hex");

    if (hashedPassword !== user.password) {
        return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id, username: user.username}, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });

    res.cookie("token", token);

    res.status(200).json({
        message: "User logged in successfully",
        user: user,
    });
}

async function logout(req, res) {
    res.clearCookie("token");
    res.status(200).json({
        message: "User logged out successfully"
    });
}

module.exports = { register, login, logout };