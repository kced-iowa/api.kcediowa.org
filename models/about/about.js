const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('about', aboutSchema)