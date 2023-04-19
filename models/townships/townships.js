const mongoose = require('mongoose');

const townshipsSchema = new mongoose.Schema({
    coverImg: {
        type: String
    },
    mainImg: {
        type: String
    },
    name: {
        type: String
    },
    url: {
        type: String
    },
    mapsAddress: {
        type: String
    },
    socials: [{
        type: {
            type: String
        },
        user: {
            type: String
        }
    }]
})

module.exports = mongoose.model('townships', townshipsSchema)