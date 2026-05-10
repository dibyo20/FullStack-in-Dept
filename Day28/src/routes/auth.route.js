const authRouter = require('express').Router();
const authModel = require('../models/auth.model');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

authRouter.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        res.status(400).json({ message: "Please Provide All Fields!" });
    }

    const isUserExists = await authModel.findOne({ email });

    if (isUserExists) {
        res.status(400).json({ message: "Email Already exists" });
    }

    try {
        const hashPass = crypto.createHash('md5').update(password).digest('hex');
        const newuser = await authModel.create({ username, email, password: hashPass });

        res.status(201).json({
            message: "User Registered Successfully",
        });
    } catch (err) {
        res.status(400).json({ message: "Error in registration!" });
    }
});

authRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ message: "Please Provide All Fields!" });
    }

    try {
        const user = await authModel.findOne({ email });

        if (!user) {
            res.status(404).json({ message: "User Not Found!" });
        }

        const hashPass = crypto.createHash('md5').update(password).digest('hex');

        if (user.password != hashPass) {
            res.status(401).json({ message: "Invalid Credential" });
        }

        const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET);
        res.cookie('jwt_token', token);

        res.status(200).json({
            message: "User Login Successfull!",
            data: {
                username: user.username,
                email: user.email,
            },
        });
    } catch (err) {
        res.status(500).json({ message: "Error in Logging" });
    }
});

authRouter.post('/protected', (req, res) => {
    const token = req.cookies.jwt_token;

    if (!token) {
        res.status(200).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.status(200).json({
            message: "Protected route accessed successfully",
            data: decoded,
        });
    } catch (err) {
        res.status(401).json({ message: "Inavlid Token" });
    }
});

module.exports = authRouter;