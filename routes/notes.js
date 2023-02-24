const router = require('express').Router();
const fs = require('fs');

const uniqid = require('uniqid');

// Readfile function returns an array
const getNotes = () => {
  var noteStr = fs.readFileSync('./db/db.json', 'utf-8');
  return JSON.parse(noteStr);
};

const writeNotes = (existingNotesStr) => {
  fs.writeFileSync(
    './db/db.json',
    JSON.stringify(existingNotesStr, null, 4)
  );
};

//Get Routes for retrieving notes
router.get('/', (req, res) => {
  res.json(getNotes());
});

//Post route for a new note
router.post('/', (req, res) => {
  console.info(`${req.method} request received`);
  const { title, text, uniqidId = 0 } = req.body;

//Delete routes for selected ids
router.delete('/:id', (req, res) => {
  let notes = getNotes();
  notes = notes.filter((note) => note.uniqidId !== req.params.id);
  writeNotes(notes);
  res.status(200).send();
});


  let existingNotesStr;
  if (req.body && title && text) {
    const newNote = {
      title,
      text,
      uniqidId: uniqid(),
    };
    
    existingNotesStr = getNotes();

    //Add a new note
    existingNotesStr.push(newNote);

    writeNotes(existingNotesStr);

    return res.json(newNote);
  } else {
    res.status(500).json(`Error in posting notes`);
  }
});

module.exports = router;