const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {protect} = require('../middleware/authMiddleware');

// @route User route (POST)
// @desc Route to create a user
// @access Public
router.route('/login').post(userController.login);

// @route User route (POST)
// @desc Route to create a user
// @access Public
router.route('/register').post(userController.register);

// @route User route (POST)
// @desc Route to logout a user
// @access Public
router.route('/logout').post(userController.logout);

// @route User route (POST)
// @desc Route to delete a user
// @access Private
router.route('/').delete(protect, userController.deleteUser);

module.exports = router;