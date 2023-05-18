const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    type: {
        type: String,
    },
    coverimg: {
        type: String
    },
    mainimg: {
        type: String
    },
    contactimg: {
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
    socials: [{
        type: {
            type: String
        },
        user: {
            type: String
        }
    }],
    contact: {
        name: {
            type: String
        },
        position: {},
        number: {},
        email: {},
        website: {}
    }
})

module.exports = mongoose.model('business', businessSchema)