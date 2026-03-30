const notesRouter = require("express").Router();
const { createNote, getNotes, getNoteById, deleteNotes, updateNote } = require("../controllers/notes.controller.js");

notesRouter.post("/create", createNote);

notesRouter.get("/get", getNotes);

notesRouter.get("/get/:id", getNoteById);

notesRouter.delete("/delete/:id", deleteNotes);

notesRouter.patch("/update/:id", updateNote);

module.exports = notesRouter;