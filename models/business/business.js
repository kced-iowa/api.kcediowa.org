const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    coverimg: {
        type: String
    },
    mainimg: {
        type: String
    },
    phone: {
        type: String
    },
    address: {
        type: String
    },
    bio: {
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