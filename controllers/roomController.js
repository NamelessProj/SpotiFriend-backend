const asyncHandler = require('express-async-handler');
const Room = require('../models/roomModel');

// @desc   Getting all rooms
// @route  GET /api/room/
// @access Private
const getRooms = asyncHandler(async (req, res) => {
    const user = req.user;
    const rooms = await Room.find({owner: user._id}); // Getting all the rooms of the user
    res.status(200).json({rooms});
});

// @desc   Getting a room by an id
// @route  GET /api/room/:id
// @access Public
const getRoomById = asyncHandler(async (req, res) => {
    const {id} = req.params;
    const room = await Room.findOne({_id: id, isPublic: true});
    res.status(200).json({room});
});

// @desc   Creating a room
// @route  POST /api/room/
// @access Private
const createRoom = asyncHandler(async (req, res) => {
    const {name, description, isPublic} = req.body;
    const user = req.user;

    // Checking if the fields are filled
    if(!name || !description || name === '' || description === '' || isPublic === undefined){
        res.status(400).json({message: "Please fill all the required fields"});
        throw new Error("Please fill all the required fields");
    }

    // Checking if the room exist
    const roomExists = await Room.findOne({name});
    if(roomExists){
        res.status(400).json({message: "This room already exist."});
        throw new Error("This room already exist.");
    }

    // Creating the room
    const room = await Room.create({
        name,
        description,
        isPublic,
        owner: user._id
    });

    if(!room){
        res.status(400).json({message: "An error occurred while creating the room."});
        throw new Error("An error occurred while creating the room.");
    }
    res.status(201).json({room});
});

// @desc   Updating a room
// @route  PUT /api/room/:id
// @access Private
const updateRoom = asyncHandler(async (req, res) => {
    const {id} = req.params;
    const user = req.user;

    // Getting the room
    const room = await Room.findOne({_id: id, owner: user._id});
    if(!room){
        res.status(404).json({message: "Room not found."});
        throw new Error("Room not found.");
    }

    // Updating the room information
    room.name = req.body.name || room.name;
    room.description = req.body.description || room.description;
    room.isPublic = req.body.isPublic || room.isPublic;

    await room.save();

    res.status(200).json({room});
});

// @desc   Deleting a room
// @route  DELETE /api/room/:id
// @access Private
const deleteRoom = asyncHandler(async (req, res) => {
    const {id} = req.params;
    const user = req.user;

    const room = await Room.findOne({_id: id, owner: user._id});
    if(!room){
        res.status(404).json({message: "Room not found."});
        throw new Error("Room not found.");
    }

    await Room.findByIdAndDelete(id);
    const rooms = await Room.find({owner: user._id});
    res.status(200).json({rooms});
});

module.exports = {
    getRooms,
    getRoomById,
    createRoom,
    updateRoom,
    deleteRoom
}