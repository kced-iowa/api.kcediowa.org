const mongoose = require('mongoose');

const eventsSchema = new mongoose.Schema({
    id: {
        type: Number
    },
    title: {
        type: String,
        required: true
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
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