const path = require('path');
const router = require('express').Router();

// Route to serve the notes.html file when "/notes" is requested
router.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/notes.html'));
});

// Route to serve the index.html file for all other paths
router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = router;


