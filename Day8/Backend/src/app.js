const express = require("express");
const notesRouter = require("./routes/notes.routes");
const app = express();
const json = express.json();

app.use(json);

app.use("/api", notesRouter);

module.exports = app;