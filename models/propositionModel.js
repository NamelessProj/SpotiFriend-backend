const mongoose = require('mongoose');

const authorSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    href: {
        type: String,
        required: true
    }
});

const propositionSchema = mongoose.Schema({
    room: {
        type: String,
        required: true
    },
    song: {
        authors: {
            type: [authorSchema],
            required: true
        },
        duration: {
            type: Number,
            required: true
        },
        explicit: {
            type: Boolean,
            required: true
        },
        href: {
            type: String,
            required: true
        },
        id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        isPlayable: {
            type: Boolean,
            required: true
        },
        uri: {
            type: String,
            required: true
        }
    }
});

module.exports = mongoose.model('Proposition', propositionSchema);