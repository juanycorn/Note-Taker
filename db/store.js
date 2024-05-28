const util = require('util');
const fs = require('fs');

// Import the v1 function from the uuid package
const uuidv1 = require('uuid').v1;

// Promisify fs functions to work with promises
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
  // Read data from the file
  read() {
    return readFileAsync('db/db.json', 'utf8');
  }

  // Write data to the file
  write(note) {
    return writeFileAsync('db/db.json', JSON.stringify(note));
  }

  // Get all notes from the file
  getNotes() {
    return this.read().then((notes) => {
      let parsedNotes;

      // If notes isn't an array or can't be turned into one, send back a new empty array
      try {
        parsedNotes = [].concat(JSON.parse(notes));
      } catch (err) {
        parsedNotes = [];
      }

      return parsedNotes;
    });
  }

  // Add a new note to the file
  addNote(note) {
    const { title, text } = note;

    // Validate the note
    if (!title || !text) {
      throw new Error("Note 'title' and 'text' cannot be blank");
    }

    // Add a unique id to the note using uuid package
    const newNote = { title, text, id: uuidv1() };

    // Get all notes, add the new note, write all the updated notes, and return the newNote
    return this.getNotes()
      .then((notes) => [...notes, newNote])
      .then((updatedNotes) => this.write(updatedNotes))
      .then(() => newNote);
  }

  // Remove a note from the file by its ID
  removeNote(id) {
    // Get all notes, remove the note with the given id, write the filtered notes
    return this.getNotes()
      .then((notes) => notes.filter((note) => note.id !== id))
      .then((filteredNotes) => this.write(filteredNotes));
  }
}

module.exports = new Store();
