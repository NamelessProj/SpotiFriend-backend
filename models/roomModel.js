const mongoose = require('mongoose');

const roomSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 1,
        maxlength: 20
    },
    description: {
        type: String,
        default: ''
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    isPrivate: {
        type: Boolean,
        default: true
    },
    playlistId: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Room', roomSchema);