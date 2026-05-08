const authRouter = require('express').Router();
const authModel = require('../models/auth.model');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

authRouter.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: "Please fill all the fields" });
    }

    const isUserExist = await authModel.findOne({ email });

    if (isUserExist) {
        return res.status(400).json({ message: "User already exists" });
    }

    try {
        const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
        const user = new authModel({ username, email, password: hashedPassword });
        await user.save();
        return res.status(201).json({ message: "User registered successfully", user: { username: user.username, email: user.email } });
    } catch (err) {
        return res.status(500).json({ message: "Something went wrong", error: err.message });
    }
});

authRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Please fill all the fields" });
    }

    try {
        const user = await authModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

        if (user.password !== hashedPassword) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign({
            userId: user._id,
            username: user.username,
        }, process.env.JWT_SECRET);

        res.cookie("jwt_token", token);

        res.status(200).json({
            message: "Login successful", data: {
                username: user.username,
                email: user.email,
            }
        });
    } catch (err) {
        return res.status(500).json({ message: "Something went wrong", error: err.message });
    }
});

authRouter.post("/protected", (req, res) => {
    const token = req.cookies.jwt_token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.status(200).json({ message: "Protected route accessed", data: decoded });
    } catch (err) {
        return res.status(401).json({ message: "Invalid token", error: err.message });
    }
});

module.exports = authRouter;
