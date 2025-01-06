const express = require('express');
const router = express.Router();
const propController = require('../controllers/propositionController');
const {adminProtect} = require('../middleware/authMiddleware');

// @route Proposition route (POST)
// @desc Route to add a proposition
// @access Public
router.route('/:roomId').post(propController.addProposition);

module.exports = router;