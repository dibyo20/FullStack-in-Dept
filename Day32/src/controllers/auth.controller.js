const userModel = require("../models/users.model.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const blacklistedTokenModel = require("../models/blacklist.model.js");

async function register(req, res) {
    const { username, email, password } = req.body;

    const isUserExists = await userModel.findOne({
        $or: [{ username }, { email }]
    });

    if (isUserExists) {
        return res.status(400).json({
            message: "User Already exists",
        });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = await userModel.create({
        username,
        email,
        password: hashedPassword,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.cookie('token', token);

    res.status(201).json({
        message: "SignUp Successfull",
        user: user,
    });
}

async function login(req, res) {
    const { email, password } = req.body;

    const isUserExists = await userModel.findOne({ email });

    if (!isUserExists) {
        return res.status(400).json({
            message: "User does not exists"
        });
    }

    const isPasswordValid = bcrypt.compareSync(password, isUserExists.password);

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid User Credentials"
        });
    }

    const token = jwt.sign({ id: isUserExists._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.cookie('token', token);

    res.status(200).json({
        message: "Login Successfull",
        user: isUserExists,
        token,
    });
}

async function logout(req, res) {
    const token = req.cookies.token;

    const blacklistedToken = await blacklistedTokenModel.create({ token });

    res.clearCookie('token');

    res.status(200).json({
        message: "Logout Successfull",
        blacklistedToken,
    });
}

async function getme(req, res) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id).select("-password");

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const blacklistedToken = await blacklistedTokenModel.findOne({
        token: req.cookies.token
    });

    if (blacklistedToken) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ user });
}

module.exports = { register, login, logout, getme };