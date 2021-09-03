const express = require("express");
const {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
} = require("../controllers/noteControllers");
const { protect } = require("../middlewares/authMiddleware");

const noteRoutes = express.Router();

noteRoutes.route("/").get(protect, getNotes);
noteRoutes.route("/create").post(protect, createNote);
noteRoutes
  .route("/:id")
  .get(getNoteById)
  .put(protect, updateNote)
  .delete(protect, deleteNote);

module.exports = noteRoutes;
