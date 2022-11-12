const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    occupation: {
        type: String,
        // required: true
    },
    join: {
        type: Number,
        // required: true
    },
    image: {
        type: String,
    },
    bio: {
        type: String,
    }
})

module.exports = mongoose.model('member', memberSchema)