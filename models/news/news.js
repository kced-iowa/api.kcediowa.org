const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    author: {
        type: String,
    },
    date: {
        type: String
    },
    title: {
        type: String
    },
    metadata: {},
    file: {
        type: String
    }
})

module.exports = mongoose.model('news', newsSchema)