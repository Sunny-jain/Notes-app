//imports
const express = require("express");
const dotenv = require("dotenv");
const notes = require("./data/notes");
const dbConnect = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddlewares");
const noteRoutes = require("./routes/noteRoutes");

const app = express();
dotenv.config();
dbConnect();
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);

// app.get("/", (req, res) => {
//   res.send("Api is running");
// });

// app.get("/api/notes", (req, res) => {
//   res.json(notes);
// });

// error handling
app.use(notFound);
app.use(errorHandler);

const PORT = 5000;

//starting server
app.listen(PORT, console.log(`Server is up and running at port ${PORT}`));
