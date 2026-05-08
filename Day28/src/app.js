const express = require("express");
const app = express();
const authRouter = require("./routes/auth.route");
const notesRouter = require("./routes/notes.route");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/notes", notesRouter);

module.exports = app;
