//dependencies
const express = require('express');
const router = express.Router();
let notes = require('../db/db.json');
const path = require('path');
const fs = require('fs');
// syntax to create a uuid : https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require('uuid');


//GET notes and return db.json
router.get('/notes', (req,res) =>{
    res.json(notes);
});

//POST notes and retuen new note
router.post('/notes', (req, res) =>{

    const {title, text} = req.body;

    //if title and text are present, then, add a unique ID
    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };
    notes.push(newNote);

    let userNotes = JSON.stringify(notes, null);

    //write files to db.json

    fs.writeFile(`./db/db.json`,userNotes, (err)=>{
    if (err) {
        console.error(err);
      } else {
        console.log('New note has been added!');
      }
    });
  
     const response = {
        status: 'success',
        body: newNote,
    };
   
    // 201 : successful request
    res.status(201).json(response);
} else {
    // 500 : server-side error
    res.status(500).json('Error in adding note');
}
    });

router.delete('/notes/:id', (req, res) => {
    const { id } = req.params;

    fs.readFile("./db/db.json", "utf8", (error, data) =>{
        if (error) {
            console.error(error);
          } else {
            notes = JSON.parse(data);
          }
    });
    //use filter method to filter unique id
    const deletedNote = notes.filter(note => note.id === req.params.id)

    if(deletedNote) {
        let filteredNotes = notes.filter(note => note.id != req.params.id)
        let userNotes = JSON.stringify(filteredNotes, null);
        fs.writeFile(`./db/db.json`, userNotes, (err) =>{
            if (err) {
                console.error(err)
            } else {
                console.log(`Note deleted!`)   
            }
        })
        res.status(200).json(filteredNotes);
    } else {
        res.status(500).json('Error deleting note');
    }
});

//exports api routes
module.exports = router;
