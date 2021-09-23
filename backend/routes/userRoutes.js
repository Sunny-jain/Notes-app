const express = require("express");
const {
  registerUser,
  loginUser,
  updateUserProfile,
} = require("../controllers/userControllers");
const { protect } = require("../middlewares/authMiddleware");

const userRoutes = express.Router();

userRoutes.route("/").post(registerUser);
userRoutes.route("/login").post(loginUser);
userRoutes.route("/profile").post(protect, updateUserProfile);

module.exports = userRoutes;
