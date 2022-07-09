const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
    id: {
        type: Number,
    },
    content: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('about', aboutSchema)