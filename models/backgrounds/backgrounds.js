const mongoose = require('mongoose');

const backgroundSchema = new mongoose.Schema({
    file: {
        type: String
    }
})

module.exports = mongoose.model('backgrounds', backgroundSchema)