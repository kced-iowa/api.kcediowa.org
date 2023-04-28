const mongoose = require('mongoose');

const membershipSchema = new mongoose.Schema({
    type: {},
    name: {},
    address: {},
    contactName: {},
    contactEmail: {},
    phone: {},
    website: {},
    twitter: {},
    instagram: {}
})

module.exports = mongoose.model('memberships', membershipSchema)