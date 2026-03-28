const notesModel = require("../models/notes.model.js");

async function createNotes(req, res) {
    const { note } = req.body;

    const newNote = new notesModel({ note });
    newNote.save();

    res.status(201).json({
        message: "Note Created Successfully",
        note: newNote,
    });
}

async function getNotes(req, res) {
    const notes = await notesModel.find();

    res.status(200).json({
        message: "Notes Recieved Successfully",
        notes: notes,
    });
}

module.exports = { createNotes, getNotes };