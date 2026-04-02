const notesModel = require("../models/notes.model.js");

async function createNotes(req, res) {
    const { title, description } = req.body;

    const newNote = await notesModel.create({ title, description });
    newNote.save();

    res.status(201).json({
        message: "Note Created Succcessfully",
        note: newNote,
    });
}

async function getNotes(req, res) {
    const notes = await notesModel.find();

    res.status(200).json({
        message: "Notes Retrieved Successfully",
        notes: notes,
    });
}

async function deleteNotes(req, res) {
    const { id } = req.params;
    await notesModel.findByIdAndDelete(id);

    res.status(200).json({
        message: "Note Deleted Successfully",
    });
}

async function updateNotes(req, res) {
    const { id } = req.params;
    const { title, description } = req.body;
    await notesModel.findByIdAndUpdate(id, { title, description });

    const note = await notesModel.findById(id);

    res.status(200).json({
        message: "Note Updated Successfully",
        note: note,
    });
}

module.exports = { createNotes, getNotes, deleteNotes, updateNotes };