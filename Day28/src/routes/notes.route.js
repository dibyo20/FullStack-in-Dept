const notesRouter = require("express").Router();
const notesModel = require("../models/notes.model");
const jwt = require("jsonwebtoken");

notesRouter.post("/create", async (req, res) => {
    const { title, description } = req.body;
    const token = req.cookies.jwt_token;

    if (!token) {
        return res.status(401).send("Unauthorized");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const note = await notesModel.create({
        title,
        description,
        user: decoded.username,
    });

    res.status(201).json({
        message: "Note created successfully",
        note,
    });
});

module.exports = notesRouter;