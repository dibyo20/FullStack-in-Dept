const notesModel = require("../models/notes.model.js");

async function createNotes(req, res) {
    const { title, description } = req.body;

    const newNote = await notesModel.create({
        title, description,
    });

    res.status(201).json({
        message: "Note Created Successfully",
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
    const id = req.params.id;
    await notesModel.findByIdAndDelete(id);

    const notes = await notesModel.find();

    res.status(200).json({
        message: "Notes Deleted Successfully",
        notes: notes,
    });
}

async function updateNotes(req, res) {
    const id = req.params.id;
    const { description } = req.body;

    const updateNote = await notesModel.findByIdAndUpdate(id, { description });

    res.status(201).json({
        message: "Note Updated Successfully",
        notes: updateNote,
    });
}

module.exports = { createNotes, getNotes, deleteNotes, updateNotes };