const notesrouter = require("express").Router();
const notesModel = require("../models/notes.model");
const jwt = require('jsonwebtoken');

notesrouter.post("/create", async (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({ message: "Please fill all the fields" });
    }

    const token = req.cookies.jwt_token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const newNote = new notesModel({ title, description, userId: decoded.userId });
    await newNote.save();

    res.status(201).json({ message: "Note added successfully", note: newNote });
});

module.exports = notesrouter;