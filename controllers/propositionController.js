const asyncHandler = require('express-async-handler');
const Room = require('../models/roomModel');
const {sendEmail} = require('../utils/sendEmail');

// @desc   Adding a proposition
// @route  POST /api/proposition/:roomId
// @access Public
const addProposition = asyncHandler(async (req, res) => {
    const {song} = req.body; // Must send an object "song" with the song's information in the body
    const {roomId} = req.params;

    const room = await Room.findOne({_id: roomId, isPublic: true}).populate("owner");
    if(!room){
        res.status(404).json({message: "Room not found."});
        throw new Error("Room not found.");
    }

    res.status(201).json({message: "Proposition send."});
    // Sending an email to the room's owner
    const artists = song.artists.map(artist => artist.name).join(', ');
    await sendEmail(room.owner.email, `New Proposition - ${room.name}`, `<h2>Room - ${room.name}</h2><p>A new proposition was sent.</p><br/><p><b>${song.name} - ${artists}</b></p><br/><p>Song is explicit: <b>${song.explicit}</b></p><p>Song name: <b>${song.name}</b></p><p>Song uri: <b>${song.uri}</b></p><p>Song url: <b>${song.external_urls.spotify}</b></p><p>Artists: <b>${artists}</b></p><p>Song href: <b>${song.href}</b></p>`);
});

module.exports = {addProposition}