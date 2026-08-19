const authRouter = require("express").Router();
const authModel = require("../models/auth.model.js");
const jwt = require("jsonwebtoken");

authRouter.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: "Please fill all the fields" });
    }

    const isUserExists = await authModel.findOne({ email });

    if (isUserExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new authModel({ username, email, password });
    newUser.save();

    res.status(201).json({
        message: "User registered successfully",
        user: newUser
    });
})

authRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Please fill all the fields" });
    }

    const user = await authModel.findOne({ email });

    if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    if (user.password !== password) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({
        id: user._id,
        username: user.username,
    }, process.env.JWT_SECRET);

    res.cookie("jwt_token", token);

    res.status(200).json({
        message: "User logged in successfully",
        data: {
            username: user.username,
            email: user.email,
        },
    });
});

authRouter.post("/protected", async (req, res) => {
    const token = req.cookies.jwt_token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    res.status(200).json({
        message: "Protected route accessed successfully",
    });
});

authRouter.post("/logout", (req, res) => {
    res.clearCookie("jwt_token");
    res.status(200).json({
        message: "User logged out successfully",
    });
});

module.exports = authRouter;