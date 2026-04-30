const notesRouter = require('express').Router();
const { createNote, getNotes, deleteNote, updateNote } = require('../controllers/notes.controller');

notesRouter.post('/create', createNote);

notesRouter.get('/get', getNotes);

notesRouter.delete('/delete/:id', deleteNote);

notesRouter.patch('/update/:id', updateNote);

module.exports = notesRouter;