const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
    note: String,
});

const notesModel = mongoose.model("Notes", notesSchema);

module.exports = notesModel;