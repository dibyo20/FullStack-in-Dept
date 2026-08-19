const express = require('express');
const app = express();
const cors = require('cors');
const noteRouter  = require('./routes/notes.route.js');

app.use(cors({
    origin: 'http://localhost:5173',
    withCredentials: true,
}));

app.use(express.json());

app.use('/api/notes', noteRouter);

module.exports = app;