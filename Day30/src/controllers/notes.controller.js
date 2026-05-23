const notesModel = require('../models/notes.model.js');
const jwt = require('jsonwebtoken');

async function createNote(req, res) {
    const { title, description } = req.body;

    const newNote = await notesModel.create({
        title,
        description,
        userId: req.user.id,
        name: req.user.username,
    });

    res.status(201).json({
        message: 'Note created successfully',
        note: newNote,
    });
}

async function getNotes(req, res) {
    const notes = await notesModel.find();

    res.status(200).json({
        message: 'Notes fetched successfully',
        notes
    });
}

async function getNotesById(req, res) {
    const { id } = req.params;

    if (id.toString() !== req.user.id) {
        return res.status(401).json({
            message: 'Unauthorized',
        });
    }

    const notes = await notesModel.find({ userId: id });

    res.status(200).json({
        message: 'Notes fetched successfully',
        notes
    });
}

async function deleteNote(req, res) {
    const id = req.params.id;
    const note = await notesModel.findById(id);

    if (note.userId.toString() !== req.user.id) {
        return res.status(401).json({
            message: 'Unauthorized',
        });
    }

    await notesModel.findByIdAndDelete(id);

    res.status(200).json({
        message: 'Note deleted successfully',
    });
}

async function updateNote(req, res) {
    const id = req.params.id;
    const { title, description } = req.body;

    const note = await notesModel.findById(id);

    if (note.userId.toString() !== req.user.id) {
        return res.status(401).json({
            message: 'Unauthorized',
        });
    }

    await notesModel.findByIdAndUpdate(id, { title, description });
    const updatedNote = await notesModel.findById(id);

    res.status(200).json({
        message: 'Note updated successfully',
        note: updatedNote
    });
}

module.exports = {
    createNote,
    getNotes,
    getNotesById,
    deleteNote,
    updateNote,
}