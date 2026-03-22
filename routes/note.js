const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const auth = require("../middleware/auth");

// ➤ CREATE NOTE
router.post("/", auth, async (req, res) => {
  try {
    const note = new Note({
      userId: req.user.userId,
      title: req.body.title,
      content: req.body.content,
    });

    await note.save();

    res.json({ message: "Note created", note });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// ➤ GET NOTES
router.get("/", auth, async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.userId });
    res.json(notes);

  } catch (err) {
    console.log(err);   // 🔥 IMPORTANT (see error in console)
    res.status(500).json({ error: err.message });
  }
});

// ➤ UPDATE NOTE
router.put("/:id", auth, async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      { title: req.body.title, content: req.body.content },
      { new: true }
    );
    if (!note) return res.status(404).json({ error: "Note not found" });
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ➤ DELETE NOTE
router.delete("/:id", auth, async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
    if (!note) return res.status(404).json({ error: "Note not found" });
    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;