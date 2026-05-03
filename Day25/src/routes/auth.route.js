const authRouter = require('express').Router();
const authModel = require('../models/auth.model.js');
const jwt = require('jsonwebtoken');

//POST- /api/auth/register
authRouter.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const isUserExists = await authModel.findOne({ email });

    if (isUserExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new authModel({ username, email, password });
    newUser.save();

    res.status(201).json({
        message: 'User registered successfully',
        user: newUser,
    });
});

//POST- /api/auth/login
authRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const user = await authModel.findOne({ email });

    if (!user) {
        return res.status(400).json({ message: "User Not Found!" });
    }

    if (user.password !== password) {
        return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign({ // We are signing the token with user id and username as payload.
        id: user._id,
        username: user.username,
    }, process.env.JWT_SECRET,);

    res.cookie("jwt_token", token); // We are saving the token in cookies.

    res.status(200).json({
        message: "User logged in successfully",
        data: {
            username: user.username,
            email: user.email,
        },
    });
});

//POST- /api/auth/protected
authRouter.post("/protected", (req, res) => { // After user login is successful, we can access the protected route.
    const token = req.cookies.jwt_token;

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }

    res.status(200).json({
        message: "Protected route accessed successfully",
    });
});

//POST- /api/auth/logout
authRouter.post("/logout", (req, res) => {
    res.clearCookie("jwt_token"); // We are clearing the cookie when user logs out.

    res.status(200).json({
        message: "User logged out successfully",
    });
});

module.exports = authRouter;