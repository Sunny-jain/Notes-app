//imports
const express = require("express");
const dotenv = require("dotenv");
const notes = require("./data/notes");
const dbConnect = require("./config/db");

const app = express();
dotenv.config();
dbConnect();

app.get("/", (req, res) => {
  res.send("Api is running");
});

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.get("/api/notes/:id", (req, res) => {
  const note = notes.filter((n) => n._id === req.params.id);
  res.send(note);
});

const PORT = 5000;

//starting server
app.listen(PORT, console.log(`Server is up and running at port ${PORT}`));
