//imports
const express = require("express");
require("dotenv").config();
const notes = require('./data/notes');

const app = express();

app.get("/", (req, res) => {
    res.send("Api is running");
})

app.get('/api/notes', (req, res) => {
    res.json(notes);
})

app.get("/api/notes/:id", (req, res) => {
    const note = notes.filter((n) => n._id === req.params.id);
    res.send(note);
})

const PORT =  5000;

//starting server
app.listen(PORT, console.log(`Server is up and running at port ${PORT}`))