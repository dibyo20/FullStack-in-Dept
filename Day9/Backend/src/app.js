const express = require("express");
const app = express();
const json = express.json();
const notesRouter = require("./routes/notes.route.js");

app.use(json);

app.use("/api", notesRouter);

module.exports = app;