const express = require('express');
const router = express.Router();
const propController = require('../controllers/propositionController');
const {adminProtect} = require('../middleware/authMiddleware');

// @route Proposition route (GET)
// @desc Route to get every proposition
// @access Private (admin)
router.route('/').get(adminProtect, propController.getPropositions);

// @route Proposition route (POST)
// @desc Route to add a proposition
// @access Public
router.route('/:roomId').post(propController.addProposition);

// @route Proposition route (POST)
// @desc Route to accept a proposition
// @access Private (admin)
router.route('/:id/accept').post(adminProtect, propController.acceptProposition);

// @route Proposition route (DELETE)
// @desc Route to delete a proposition
// @access Private (admin)
router.route('/:id').delete(adminProtect, propController.deleteProposition);

module.exports = router;