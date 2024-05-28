const router = require('express').Router();
const store = require('../db/store');

// GET "/api/notes": Retrieves all notes from the database
router.get('/notes', (req, res) => {
  // Fetch all notes from the data store
  store
    .getNotes()
    .then((notes) => {
      // Respond with the retrieved notes
      return res.json(notes);
    })
    .catch((err) => res.status(500).json(err)); // Handle any potential errors
});

// POST "/api/notes": Adds a new note to the database
router.post('/notes', (req, res) => {
  // Create a new note using the request body data
  store
    .addNote(req.body)
    .then((note) => res.json(note)) // Respond with the added note
    .catch((err) => res.status(500).json(err)); // Handle any potential errors
});

// DELETE "/api/notes/:id": Deletes the note with the specified ID
router.delete('/notes/:id', (req, res) => {
  // Remove the note with the provided ID
  store
    .removeNote(req.params.id)
    .then(() => res.json({ ok: true })) // Respond with a success message
    .catch((err) => res.status(500).json(err)); // Handle any potential errors
});

module.exports = router;
