const noteModel = require("../models/notes.model.js");

async function createNotes(req, res) {
    const { note } = req.body;

    const newNote = new noteModel({ note });
    newNote.save();

    res.status(201).json({
        message: "Note Created Successfully",
        note: newNote,
    });
}

async function getNotes(req, res) {
    const notes = await noteModel.find();
    res.status(200).json({
        message: "Notes Retrieved Successfully",
        note: notes,
    });
}

module.exports = { createNotes, getNotes };