const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        default: "pending",
    }
});

const notesModel = mongoose.model("KeepNotes", notesSchema);

module.exports = notesModel;