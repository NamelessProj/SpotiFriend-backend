const asyncHandler = require('express-async-handler');
const Proposition = require('../models/propositionModel');
const Room = require('../models/roomModel');
const axios = require("axios");
const {getAccessToken} = require('../utils/getAccessToken');

// @desc   Getting all propositions
// @route  GET /api/proposition/
// @access Private (Admin)
const getPropositions = asyncHandler(async (req, res) => {
    const propositions = await Proposition.find();
    res.status(200).json({propositions});
});

// @desc   Adding a proposition
// @route  POST /api/proposition/:roomId
// @access Public
const addProposition = asyncHandler(async (req, res) => {
    const {song} = req.body;
    const {roomId} = req.params;

    // Must send an object "song" with the song's information in the body

    const proposition = await Proposition.create({
        song,
        room: roomId
    });

    res.status(201).json({proposition});
});

// @desc   Accepting a proposition
// @route  POST /api/proposition/:id/accept
// @access Private (admin)
const acceptProposition = asyncHandler(async (req, res) => {
    const {id} = req.params; // Proposition's id
    const proposition = await Proposition.findById(id);
    if(!proposition){
        res.status(404).json({message: "Proposition not found."});
        throw new Error("Proposition not found.");
    }
    const room = await Room.findById(proposition.room);
    if(!room){
        res.status(404).json({message: "Room not found."});
        throw new Error("Room not found.");
    }
    const token = await getAccessToken();
    await axios.post(`https://api.spotify.com/v1/playlists/${room.playlistId}/tracks`, {
        uris: [proposition.song.uri]
    }, {
        headers: {
            'Authorization': `Bearer ${token.token}`
        }
    });

    await Proposition.findByIdAndDelete(id);
    const propositions = await Proposition.find({room: proposition.room});
    res.status(200).json({propositions});
});

// @desc   Removing a proposition
// @route  DELETE /api/proposition/:id
// @access Private (admin)
const deleteProposition = asyncHandler(async (req, res) => {
    const {id} = req.params;
    const propositionExist = await Proposition.findById(id);
    if(!propositionExist){
        res.status(404).json({message: "Proposition not found."});
        throw new Error("Proposition not found.");
    }
    await Proposition.findByIdAndDelete(id);
    const propositions = await Proposition.find({room: propositionExist.room});
    res.status(200).json({propositions});
});

// @desc   Removing all propositions of a room
// @route  DELETE /api/proposition/room/:id
// @access Private (admin)
const deleteAllPropositions = asyncHandler(async (req, res) => {
    const {id} = req.params;
    await Proposition.deleteMany({room: id});
    res.status(200).json({message: "Propositions deleted."});
});

module.exports = {
    getPropositions,
    addProposition,
    acceptProposition,
    deleteProposition,
    deleteAllPropositions
}