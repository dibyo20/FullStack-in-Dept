const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
    title: String,
    description: String,
    userId:{
        type:String,
        ref:'User'
    },
});

const notesModel = mongoose.model("notes", notesSchema);

module.exports = notesModel;