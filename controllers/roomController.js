const asyncHandler = require('express-async-handler');
const Room = require('../models/roomModel');
const Proposition = require('../models/propositionModel');

// @desc   Getting all rooms
// @route  GET /api/room/
// @access Private (Admin)
const getRooms = asyncHandler(async (req, res) => {
    const rooms = await Room.find();
    res.status(200).json({rooms});
});

// @desc   Creating a room
// @route  POST /api/room/
// @access Private (Admin)
const createRoom = asyncHandler(async (req, res) => {
    const {name, description, isPrivate, playlistId} = req.body;
    const user = req.user;

    // Checking if the fields are filled
    if(!name || !description || !playlistId || name === '' || description === '' || playlistId === '' || isPrivate === undefined){
        res.status(400);
        throw new Error("Please fill all the required fields");
    }

    // Checking if the room exist
    const roomExists = await Room.findOne({name});
    if(roomExists){
        res.status(400);
        throw new Error("This room already exist.");
    }

    // Creating the room
    const room = await Room.create({
        name,
        description,
        isPrivate,
        playlistId,
        owner: user._id
    });

    if(!room){
        res.status(400);
        throw new Error("An error occured while creating the room.");
    }
    res.status(201).json({room});
});

// @desc   Updating a room
// @route  PUT /api/room/:id
// @access Private (Admin)
const updateRoom = asyncHandler(async (req, res) => {
    const {id} = req.params;

    // Getting the room
    const room = await Room.findById(id);
    if(!room){
        res.status(404);
        throw new Error("Room not found.");
    }

    // Updating the room information
    room.name = req.body.name || room.name;
    room.description = req.body.description || room.description;
    room.isPrivate = req.body.isPrivate || room.isPrivate;
    room.playlistId = req.body.playlistId || room.playlistId;

    await room.save();

    res.status(200).json({room});
});

// @desc   Deleting a room
// @route  DELETE /api/room/:id
// @access Private (Admin)
const deleteRoom = asyncHandler(async (req, res) => {
    const {id} = req.params;
    await Room.findByIdAndDelete(id);
    await Proposition.deleteMany({room: id});
    const rooms = await Room.find();
    res.status(200).json({rooms});
});

module.exports = {
    getRooms,
    createRoom,
    updateRoom,
    deleteRoom
}