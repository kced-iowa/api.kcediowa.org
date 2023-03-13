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
router.post('/', async (req, res) => {
    const event = new Events({
        title: req.body.title,
        dd: req.body.dd,
        mm: req.body.mm,
        timestart: req.body.timestart,
        timeend: req.body.timeend,
        desc: req.body.desc,
        address: req.body.address,
        rsvp: req.body.rsvp
    })
    try {
        const newEvent = await event.save()
        res.status(201).json(newEvent)
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})

module.exports = router;