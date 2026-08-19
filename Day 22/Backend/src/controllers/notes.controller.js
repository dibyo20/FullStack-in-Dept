const notesModel = require("../models/notes.model.js");

async function createNote(req, res) {
    const { title, content } = req.body;

    const newNote = await notesModel.create({ title, content });
    newNote.save();

    res.status(201).json({
        message: "Note created successfully",
        note: newNote,
    });
}

async function getNotes(req, res) {
    const notes = await notesModel.find();
    res.status(200).json({
        message: "Notes retrieved successfully",
        notes: notes,
    });
}

module.exports = { createNote, getNotes };
