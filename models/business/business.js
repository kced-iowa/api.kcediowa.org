const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
    id: {
        type: Number,
    },
    test: {
        type: String,
    }
})

module.exports = mongoose.model('business', businessSchema)