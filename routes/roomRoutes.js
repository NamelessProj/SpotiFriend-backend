const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');
const {adminProtect} = require('../middleware/authMiddleware');

// @route Room route (GET)
// @desc Route to get every room
// @access Private (admin)
router.route('/').get(adminProtect, roomController.getRooms);

// @route Room route (GET)
// @desc Route to get a room by its id
// @access Public
router.route('/:id').get(roomController.getRoomById);

// @route Room route (POST)
// @desc Route to create a room
// @access Private (admin)
router.route('/').post(adminProtect, roomController.createRoom);

// @route Room route (PUT)
// @desc Route to update a room
// @access Private (admin)
router.route('/:id').put(adminProtect, roomController.updateRoom);

// @route Room route (DELETE)
// @desc Route to delete a room
// @access Private (admin)
router.route('/:id').delete(adminProtect, roomController.deleteRoom);

module.exports = router;