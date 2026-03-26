let notes = [];

function createNotes(req, res) {
    const note = req.body.note;
    notes.push(note);
    res.status(201).json({
        message: "Note Recieved Successfully",
        note
    });
}

function getNotes(req, res) {
    res.status(200).json({
        message: "Notes Retrieved Successfully",
        notes
    });
}

module.exports = { createNotes, getNotes };