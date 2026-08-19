const express = require('express');
const app = express();
const cors = require('cors');
const notesRouter = require('./routes/notes.route.js');

app.use(cors({
    origin: "http://localhost:5173",
    withCredentials: true,
}));

app.use(express.json());

app.use("/api/notes", notesRouter);

module.exports = app;