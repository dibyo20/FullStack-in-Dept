const authRouter = require("express").Router();
const authModel = require("../models/auth.model");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

authRouter.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: "Please provide all fields" });
    }

    const isUserExists = await authModel.findOne({ email });

    if (isUserExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    try {
        const hashedPassword = crypto.createHash("md5").update(password).digest("hex");
        const user = await authModel.create({ username, email, password: hashedPassword });
        res.status(201).json({ message: "User created successfully", user });
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
});

authRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Please provide all fields" });
    }

    try {
        const user = await authModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const hashedPassword = crypto.createHash("md5").update(password).digest("hex");
        if (user.password !== hashedPassword) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET);
        res.cookie("jwt_token", token);

        res.status(200).json({
            message: "Login successful", data: {
                username: user.username,
                email: user.email,
            }
        });
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
});

authRouter.post("/protected", async (req, res) => {
    const token = req.cookies.jwt_token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token using the same secret key and decode the payload
        res.status(200).json({ message: "Protected route", data: decoded });
    } catch (err) {
        res.status(401).json({ message: "Unauthorized", error: err.message });
    }
});

module.exports = authRouter;