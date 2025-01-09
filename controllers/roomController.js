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
    if(!room){
        res.status(404).json({message: "Room not found."});
        throw new Error("Room not found.");
    }
    res.status(200).json({room});
});

// @desc   Creating a room
// @route  POST /api/room/
// @access Private
const createRoom = asyncHandler(async (req, res) => {
    const {name, isPublic} = req.body;
    const user = req.user;

    // Making sure the user doesn't have more than 10 rooms
    const roomsNumber = await Room.find({owner: user._id}).countDocuments();
    if(roomsNumber >= 10){
        res.status(400).json({message: "You can't have more than 10 rooms."});
        throw new Error("You can't have more than 10 rooms.");
    }

    // Checking if the fields are filled
    if(!name || name === '' || isPublic === undefined){
        res.status(400).json({message: "Please fill all the required fields"});
        throw new Error("Please fill all the required fields");
    }

    // Checking if the room exist already
    const roomExists = await Room.findOne({name, owner: user._id});
    if(roomExists){
        res.status(400).json({message: "You already have one room called that way."});
        throw new Error("You already have one room called that way.");
    }

    const description = req.body.description || '';

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
    const rooms = await Room.find({owner: user._id});
    res.status(201).json({rooms});
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

    // Checking if the name is already taken
    if(req.body.name){
        const roomExists = await Room.findOne({
            name: req.body.name,
            owner: user._id,
            _id: {$ne: id}
        });
        if(roomExists){
            res.status(400).json({message: "You already have one room called that way."});
            throw new Error("You already have one room called that way.");
        }
        room.name = req.body.name; // Updating the room name if it's not already taken
    }

    // Updating the room information
    room.description = req.body.description || room.description;
    room.isPublic = req.body.isPublic;

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

    await Room.findByIdAndDelete(room._id);
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