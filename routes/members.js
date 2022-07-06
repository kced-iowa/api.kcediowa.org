const express = require('express');
const router = express.Router();
const member = require('../models/members')

router.get('/', async (req, res) => {
    try {
        const members = await member.find()
        res.json(members)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


module.exports = router