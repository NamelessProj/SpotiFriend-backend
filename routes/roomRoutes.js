const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');
const {protect} = require('../middleware/authMiddleware');

// @route Room route (GET)
// @desc Route to get every room
// @access Private
router.route('/').get(protect, roomController.getRooms);

// @route Room route (GET)
// @desc Route to get a room by its id
// @access Public
router.route('/:id').get(protect, roomController.getRoomById);

// @route Room route (GET)
// @desc Route to get a room by its slug
// @access Public
router.route('/slug/:slug').get(roomController.getRoomBySlug);

// @route Room route (POST)
// @desc Route to create a room
// @access Private
router.route('/').post(protect, roomController.createRoom);

// @route Room route (PUT)
// @desc Route to update a room
// @access Private
router.route('/:id').put(protect, roomController.updateRoom);

// @route Room route (DELETE)
// @desc Route to delete a room
// @access Private
router.route('/:id').delete(protect, roomController.deleteRoom);

module.exports = router;