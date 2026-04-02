const notesRouter = require("express").Router();
const { createNotes, getNotes, deleteNotes, updateNotes } = require("../controllers/notes.controller.js");

notesRouter.post("/create", createNotes);

notesRouter.get("/get", getNotes);

notesRouter.delete("/delete/:id", deleteNotes);

notesRouter.patch("/update/:id", updateNotes);

module.exports = notesRouter;