const authRouter = require("express").Router();
const authModel = require("../models/auth.model.js");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

authRouter.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: "Please provide all the details" });
    }

    const isUserExists = await authModel.findOne({ email: email });

    if (isUserExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    const hashedPass = crypto.createHash("md5").update(password).digest("hex");

    const newUser = await authModel.create({ username, email, password: hashedPass });
    newUser.save();

    res.status(201).json({
        message: "User created successfully",
        user: newUser
    });
});

authRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Please provide all the details" });
    }
    const user = await authModel.findOne({ email: email });

    if (!user) {
        return res.status(400).json({ message: "Invalid email" });
    }

    const hashedPass = crypto.createHash("md5").update(password).digest("hex");

    if (user.password !== hashedPass) {
        return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({
        id: user._id,
        username: user.username,
    }, process.env.JWT_SECRET);

    res.cookie("jwt_token", token);

    res.status(200).json({
        message: "Login successful",
        data: {
            username: user.username,
            email: user.email
        }
    });
});

authRouter.post("/protected", async (req, res) => {
    const token = req.cookies.jwt_token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    res.status(200).json({ message: "Protected route accessed" });
});

authRouter.post("/logout", (req, res) => {
    res.clearCookie("jwt_token");
    res.status(200).json({ message: "Logout successful" });
});

module.exports = authRouter;