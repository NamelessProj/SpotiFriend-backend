const express = require('express');
const router = express.Router();
const accessController = require('../controllers/accessController');

// @route Access route (GET)
// @desc Route to get the access token
// @access Public
router.route('/').get(accessController.getTheAccessToken);

module.exports = router;