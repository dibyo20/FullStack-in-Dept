const express = require("express");
const app = express();
const notesRouter = require("../src/routes/notes.router.js");

app.use(express.json());

app.use("/api/notes", notesRouter);

module.exports = app;