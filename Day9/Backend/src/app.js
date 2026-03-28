const express = require("express");
const app = express();
const notesRouter = require("./routes/notes.route.js");

app.use(express.json());

app.use("/api", notesRouter);

module.exports = app;