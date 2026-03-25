let notes = [];

function createNotes(req, res) {
    const note = req.body.note;
    notes.push(note);
    res.status(201).json({
        message: "Note Created successfully",
        note
    });
}

function getNotes(req, res) {
    res.status(200).json({
        message: "Notes retrieved successfully",
        notes
    });
}

module.exports = { createNotes, getNotes };