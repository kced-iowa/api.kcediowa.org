const mongoose = require('mongoose');

const contactsSchema = new mongoose.Schema({
    id: {
        type: Number,
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    website: {
        type: String,
    }
})

module.exports = mongoose.model('contacts', contactsSchema)