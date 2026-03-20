const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const auth = require("../middleware/auth");


// ➤ Create Note
router.post("/", auth, async (req, res) => {
    try {
        const { title, content } = req.body;

        const note = new Note({
            userId: req.user.userId,
            title,
            content
        });

        await note.save();

        res.json({ message: "Note created", note });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// ➤ Get All Notes (only user’s notes)
router.get("/", auth, async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.user.userId });
        res.json(notes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// ➤ Delete Note
router.delete("/:id", auth, async (req, res) => {
    try {
        await Note.findByIdAndDelete(req.params.id);
        res.json({ message: "Note deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;