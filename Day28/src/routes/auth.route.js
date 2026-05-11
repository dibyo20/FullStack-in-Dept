const authRouter = require('express').Router();
const authModel = require('../models/auth.model');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

authRouter.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({
            message: 'Please provide all the details',
        });
    }

    const user = await authModel.findOne({ email });

    if (user) {
        return res.status(400).json({
            message: 'User already exists',
        });
    }

    try {
        const hashPass = crypto.createHash('md5').update(password).digest('hex');
        const newUser = await authModel.create({ username, email, password: hashPass });

        return res.status(201).json({
            message: 'User created successfully',
            user: newUser,
        });
    } catch (err) {
        return res.status(500).json({
            message: 'Internal server error',
        });
    }
});

authRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: 'Please provide all the details',
        });
    }

    const user = await authModel.findOne({ email });

    if (!user) {
        return res.status(400).json({
            message: 'User does not exist',
        });
    }

    const hashPass = crypto.createHash('md5').update(password).digest('hex');

    if (hashPass !== user.password) {
        return res.status(400).json({
            message: 'Invalid password',
        });
    }

    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET);
    res.cookie('jwt_token', token);

    return res.status(200).json({
        message: 'Login successful',
        data: {
            username: user.username,
            email: user.email,
        }
    });
});

authRouter.post('/protected', (req, res) => {
    const token = req.cookies.jwt_token;

    if (!token) {
        return res.status(401).json({
            message: 'Unauthorized',
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return res.status(200).json({
            message: 'Protected route',
            data: decoded,
        });
    } catch (err) {
        return res.status(401).json({
            message: 'Invalid token',
        });
    }
});

module.exports = authRouter;