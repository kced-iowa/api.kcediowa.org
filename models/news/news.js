const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    id: {
        type: Number
    },
    author: {
        type: String,
        required: true
    },
    mm: {
        type: String,
    },
    dd: {
        type: Number
    },
    yy: {
        type: Number
    },
    title: {
        type: String
    },
    content: {
        type: String
    }
})

module.exports = mongoose.model('news', newsSchema)