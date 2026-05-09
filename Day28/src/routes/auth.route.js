const authRouter = require('express').Router();
const authModel = require('../models/auth.model');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

authRouter.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        res.status(400).json({ message: 'Please provide all fields' });
    }

    const isUserExists = await authModel.findOne({ email });

    if (isUserExists) {
        res.status(400).json({ message: 'Email already Exists' });
    }

    try {
        const hashedPass = crypto.createHash('md5').update(password).digest('hex');
        const newUser = await authModel.create({ username, email, password: hashedPass });
        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        res.status(400).json({ message: "User Registered Successfully" });
    }
});

authRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ message: 'Please provide all fields' });
    }

    try {
        const user = await authModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const hashedPass = crypto.createHash('md5').update(password).digest('hex');

        if (!hashedPass == user.password) {
            res.status(401).json({ message: "Invalid Credentials" });
        }

        const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET);
        res.cookie('jwt_token', token);

        res.status(200).json({
            message: "Login Successfully",
            data: {
                username: user.username,
                email: user.email,
            },
        });
    } catch (err) {
        res.status(500).json({ message: 'Error logging in' });
    }

});

authRouter.post('/protected', (req, res) => {
    const token = req.cookies.jwt_token;

    if (!token) {
        res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.status(200).json({
            message: "Protected route accessed",
            data: decoded,
        });
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
});

module.exports = authRouter;