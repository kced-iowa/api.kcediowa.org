const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String
    },
    position: {
        type: String
    },
    number: {
        type: Number
    }
})

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
    contact: contactSchema
})

module.exports = mongoose.model('business', businessSchema)