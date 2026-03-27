const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
    note: String,
});

const noteModel = mongoose.model("Notes", notesSchema);

module.exports = noteModel;