const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String
    },
    position: {
        
    },
    number: {
        
    }
})

const businessSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    type: {
        type: String,
    },
    coverimg: {
        type: String
    },
    mainimg: {
        type: String
    },
    phone: {
        type: String
    },
    address: {
        type: String
    },
    bio: {
        type: String
    },
    website: {
        type: String
    },
    facebook: {
        type: String
    },
    contact: {
        name: {
            type: String
        },
        position: {
            
        },
        number: {
            
        }
    }
})

module.exports = mongoose.model('business', businessSchema)