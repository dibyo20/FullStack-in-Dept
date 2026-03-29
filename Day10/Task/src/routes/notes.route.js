const express = require("express");
const notesRouter = express.Router();
const { createNote, getNotes, getNoteById, changeStatus, deleteNote, updateNote } = require("../controllers/notes.controller.js");

notesRouter.post("/create", createNote);

notesRouter.get("/get", getNotes);

notesRouter.get("/get/:id", getNoteById);

notesRouter.patch("/changeStatus/:id", changeStatus);

notesRouter.delete("/delete/:id", deleteNote);

notesRouter.patch("/update/:id", updateNote);

module.exports = notesRouter;