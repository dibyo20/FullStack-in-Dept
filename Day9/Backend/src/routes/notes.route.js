const express = require("express");
const notesRouter = express.Router();
const {createNotes, getNotes} = require("../controllers/notes.controller.js");

notesRouter.post("/notes", createNotes);

notesRouter.get("/notes", getNotes);

module.exports = notesRouter;