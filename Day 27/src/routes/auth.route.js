const authRouter = require("express").Router();
const authModel = require("../models/auth.model.js");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

authRouter.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: "Please provide all the details" });
    }

    const isUserExists = await authModel.findOne({ email });

    if (isUserExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = crypto.createHash("md5").update(password).digest("hex");

    const newuser = await authModel.create({
        username,
        email,
        password: hashedPassword
    });

    return res.status(200).json({
        message: "User created successfully",
        user: newuser
    });
});

authRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Please provide all the details" });
    }

    const user = await authModel.findOne({ email });

    if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    const hashedPassword = crypto.createHash("md5").update(password).digest("hex");

    if (!hashedPassword === user.password) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET);
    res.cookie("jwt_token", token);

    res.status(200).json({
        message: "Login successful",
        data: {
            username: user.username,
            email: user.email,
        }
    });
});

authRouter.post("/protected", (req, res) => {
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