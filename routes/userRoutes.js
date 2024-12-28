const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// @route User route (POST)
// @desc Route to create a user
// @access Public
router.route('/login').post(userController.login);

// @route User route (POST)
// @desc Route to create a user
// @access Public
router.route('/register').post(userController.register);

module.exports = router;