const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
    id: {
        type: Number,
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    coverimag: {
        type: String
    },
    website: {
        type: String
    },
    facebook: {
        type: String
    },
})

module.exports = mongoose.model('business', businessSchema)