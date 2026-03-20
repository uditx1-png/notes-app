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

// ➤ DELETE NOTE
router.delete("/:id", auth, async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Note deleted" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;