const express = require('express');
const router = express.Router();
const Events = require('../../models/events/events')

router.get('/', async (req, res) => {
    try {
        const event = await Events.find().sort({_id: -1});
        res.json(event);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})
router.post('/', async (req, res) => {
    const event = new Events({
        title: req.body.title,
        start: req.body.start,
        end: req.body.end,
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
router.patch('/:id', getEvent, async (req, res) => {
    res.event.title = req.body.title
    res.event.start = req.body.start
    res.event.end = req.body.end
    res.event.desc = req.body.desc
    res.event.address = req.body.address
    res.event.rsvp = req.body.rsvp
    try {
        const updatedEvent = await res.event.save()
        res.status(201).json(updatedEvent)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
})
router.delete("/:id", getEvent, async (req, res) => {
    try {
        await res.event.remove()
        res.status(200).json({ message: "Event deleted successfully."})
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})
async function getEvent (req, res, next) {
    let event
    try {
        event = await Events.findById(req.params.id)
        if (event == null) {
            return res.status(404).json({ message: 'Cannot find business' })
        } 
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.event = event
    next()
}
module.exports = router;