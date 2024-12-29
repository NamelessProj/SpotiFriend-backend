const mongoose = require('mongoose');

const propositionSchema = mongoose.Schema({
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    },
    song: {}
});

module.exports = mongoose.model('Proposition', propositionSchema);