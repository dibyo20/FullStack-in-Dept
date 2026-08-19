const notesModel = require("../models/notes.model.js");

async function createNote(req, res) {
    const { title, description } = req.body;

    const newNote = await notesModel.create({
        title,
        description,
    });
    newNote.save();

    res.status(201).json({
        message: "Note Created Sucessfully",
        note: newNote,
    });
}

async function getNotes(req, res) {
    const notes = await notesModel.find();

    res.status(200).json({
        message: "Notes Retrieved!",
        notes: notes,
    });
}

async function getNoteById(req, res) {
    const { id } = req.params;
    const note = await notesModel.findById(id);

    res.status(200).json({
        message: "Note Retrieved!",
        note: note,
    });
}

async function deleteNotes(req, res) {
    const { id } = req.params;
    const note = await notesModel.findByIdAndDelete(id);

    res.status(200).json({
        message: "Note Deleted",
        note: note,
    });
}

async function updateNote(req, res) {
    const { id } = req.params;
    const { title, description } = req.body;
    await notesModel.findByIdAndUpdate(id, { title, description });

    const note = await notesModel.findById(id);

    res.status(200).json({
        message: "Note Updated Successfully",
        note: note,
    });
}

module.exports = { createNote, getNotes, getNoteById, deleteNotes, updateNote };
