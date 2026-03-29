const notesModel = require("../models/notes.model.js");

async function createNote(req, res) {
    const { title, description, status } = req.body;

    const newNote = await notesModel.create({
        title, description, status
    });

    res.status(201).json({
        message: "Note Created Successfully",
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
    const id = req.params.id;
    const note = await notesModel.findById(id);

    res.status(200).json({
        message: "Notes Retrieved!",
        note: note,
    });
}

async function changeStatus(req, res) {
    const id = req.params.id;
    const { status } = req.body;
    await notesModel.findByIdAndUpdate(id, { status });

    res.status(200).json({
        message: "Status Changed!",
    });
}

async function deleteNote(req, res) {
    const id = req.params.id;
    await notesModel.findByIdAndDelete(id);

    const notes = await notesModel.find();

    res.status(200).json({
        message: "Note Deleted Successfully",
        notes: notes,
    });
}

async function updateNote(req, res) {
    const id = req.params.id;
    const { title, description } = req.body;
    const updatedNote = await notesModel.findByIdAndUpdate(id, { title, description });

    res.status(201).json({
        message: "Note Updated Successfully",
        note: updatedNote,
    });
}

module.exports = { createNote, getNotes, getNoteById, changeStatus, deleteNote, updateNote };