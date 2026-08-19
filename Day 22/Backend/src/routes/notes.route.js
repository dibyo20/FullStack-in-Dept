const notesRouter = require("express").Router();
const { createNote, getNotes } = require("../controllers/notes.controller.js");

notesRouter.post("/create", createNote);

notesRouter.get("/get", getNotes);

module.exports = notesRouter;