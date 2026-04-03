const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    }
});

const notesModel = mongoose.model("Notes", notesSchema);

module.exports = notesModel;