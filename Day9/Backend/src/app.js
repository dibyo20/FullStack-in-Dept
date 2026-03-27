const express= require("express");
const app = express();
const notesRouter = require("./routes/notes.route.js");
const json = express.json();

app.use(json);

app.use("/api", notesRouter);

module.exports = app;