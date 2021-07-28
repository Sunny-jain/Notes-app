const express = require('express');
const { registerUser } = require('../controllers/userControllers');

const userRoutes = express.Router();

userRoutes.route('/').post(registerUser);

module.exports = userRoutes;