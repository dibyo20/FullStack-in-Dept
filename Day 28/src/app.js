const express = require('express');
const app = express();
const authrouter = require('./routes/auth.route');
const notesrouter = require('./routes/notes.route');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authrouter);
app.use('/api/notes', notesrouter);

module.exports = app;