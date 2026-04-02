const expresss = require("express");
const app = expresss();
const notesRouter = require("./routes/notes.route.js");

app.use(expresss.json());

app.use("/api/notes", notesRouter);

module.exports = app;