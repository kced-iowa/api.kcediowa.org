const express = require('express');
const router = express.Router();
const Events = require('../../models/events/events')

router.get('/', async (req, res) => {
    try {
        const event = await Events.find();
        res.json(event);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

module.exports = router;