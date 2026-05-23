const notesRouter = require('express').Router();
const { createNote, getNotes, getNotesById, deleteNote, updateNote } = require('../controllers/notes.controller.js');
const { identifyUser } = require('../middlewares/auth.middleware.js');

notesRouter.post('/create', identifyUser, createNote);
notesRouter.get('/get', getNotes);
notesRouter.get('/get/:id', identifyUser, getNotesById);
notesRouter.delete('/delete/:id', identifyUser, deleteNote);
notesRouter.patch('/update/:id', identifyUser, updateNote);

module.exports = notesRouter;