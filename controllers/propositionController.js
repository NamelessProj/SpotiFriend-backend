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

// @desc   Adding a proposition
// @route  POST /api/proposition/:id/accept
// @access Public
const acceptProposition = asyncHandler(async (req, res) => {
    const {id} = req.params; // Proposition's id
    const proposition = await Proposition.findById(id);
    if(!proposition){
        res.status(404);
        throw new Error("Proposition not found.");
    }
    const room = await Room.find({uri: proposition.room});
    if(!room){
        res.status(404);
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
});

// @desc   Removing a proposition
// @route  DELETE /api/proposition/:id
// @access Private (admin)
const deleteProposition = asyncHandler(async (req, res) => {
    const {id} = req.params;
    await Proposition.findByIdAndDelete(id);
    const propositions = await Proposition.find();
    res.status(200).json({propositions});
});

module.exports = {
    getPropositions,
    addProposition,
    acceptProposition,
    deleteProposition
}