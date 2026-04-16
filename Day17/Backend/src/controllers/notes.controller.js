const notesModel = require("../models/notes.model.js");

async function createNote(req, res) {
    const { title, description } = req.body;
    const newNote = await notesModel.create({ title, description });

    res.status(201).json({
        message: "Note created successfully",
        note: newNote,
    });
}

async function getNotes(req, res) {
    const notes = await notesModel.find();

    res.status(200).json({
        message: "Notes fetched successfully",
        notes: notes,
    });
}

async function deleteNote(req, res) {
    const { id } = req.params;
    await notesModel.findByIdAndDelete(id);

    res.status(200).json({
        message: "Note deleted successfully",
    });
}

async function updateNote(req, res) {
    const { id } = req.params;
    const { title, description } = req.body;
    await notesModel.findByIdAndUpdate(id, { title, description });

    const note = await notesModel.findById(id);

    res.status(200).json({
        message: "Note updated successfully",
        note: note,
    });
}

module.exports = { createNote, getNotes, deleteNote, updateNote };