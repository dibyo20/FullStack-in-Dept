const authRouter = require('express').Router();
const authModel = require('../models/auth.model');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

authRouter.post('/register', async (req, res) => {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
        return res.status(400).json({ message: 'Username, password and email are required' });
    }

    const isUserExist = await authModel.findOne({ email });
    if (isUserExist) {
        return res.status(400).json({ message: 'User already exists' });
    }

    try {
        const hashedPassword = crypto.createHash('md5').update(password).digest('hex');
        const newUser = new authModel.create({ username, password: hashedPassword, email });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

authRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const user = await authModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const hashedPassword = crypto.createHash('md5').update(password).digest('hex');
        if (hashedPassword !== user.password) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET);
        res.cookie('jwt_token', token);

        res.status(200).json({
            message: 'Login successful', data: {
                username: user.username,
                email: user.email,
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

authRouter.post('/protected', (req, res) => {
    const token = req.cookies.jwt_token;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.status(200).json({ message: 'Protected route', data: decoded });
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized', error: error.message });
    }
});

module.exports = authRouter;