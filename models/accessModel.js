const mongoose = require('mongoose');

const accessSchema = mongoose.Schema({
    token: {
        type: String,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('Access', accessSchema);