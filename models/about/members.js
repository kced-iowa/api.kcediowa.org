const mongoose = require('mongoose');

const membersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    occupation: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('members', membersSchema)