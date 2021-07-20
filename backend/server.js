//imports
const express = require("express");
require("dotenv").config();

const app = express();

app.get("/api/notes", (req, res) => {
    res.send("Api is running");
})


const PORT =  5000;

//starting server
app.listen(PORT, console.log(`Server is up and running at port ${PORT}`))