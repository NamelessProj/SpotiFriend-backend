const mongoose = require('mongoose');

const propositionSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    },
    song: {}
});

module.exports = mongoose.model('Proposition', propositionSchema);