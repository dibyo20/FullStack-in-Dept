const authRouter = require("express").Router();
const authModel = require("../models/auth.model.js");
const jwt = require("jsonwebtoken");

authRouter.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    const isUserExists = await authModel.findOne({ email });

    if (isUserExists) {
        return res.status(400).json({
            message: "User already exists",
        });
    }

    const newUser = await authModel.create({ name, email, password });

    const token = jwt.sign({
        id: newUser._id,
        name: newUser.name,
    }, process.env.JWT_SECRET);

    res.status(201).json({
        message: "User registered successfully",
        newUser: newUser,
        token: token,
    });
});

module.exports = authRouter;