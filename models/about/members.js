const mongoose = require('mongoose');

const membersSchema = new mongoose.Schema({
    id: {
      type: Number,  
    },
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