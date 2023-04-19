const mongoose = require('mongoose');

const recreationSchema = new mongoose.Schema({
    coverImg: {
        type: String
    },
    mainImg: {
        type: String
    },
    name: {
        type: String
    },
    mapsAddress: {
        type: String
    },
    history: {
        type: String
    },
    activities: {
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

module.exports = mongoose.model('recreation', recreationSchema)