const mongoose = require('mongoose');

const eventsSchema = new mongoose.Schema({
    id: {
        type: Number
    },
    title: {
        type: String,
        required: true
    },
    dd: {
        type: Number
    },
    mm: {
        type: String
    },
    timestart: {
        type: String
    },
    timeend: {
        type: String
    },
    desc: {
        type: String
    },
    address: {
        type: String
    },
    rsvp: {
        type: String
    }
})

module.exports = mongoose.model('events', eventsSchema);