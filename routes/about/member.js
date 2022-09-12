const express = require('express');
const router = express.Router();
const Member = require('../../models/about/member');

router.get('/', async (req, res) => {
    try {
        const members = await Member.find();
        res.json(members);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})
router.get('/:id', (req, res) => {
    res.send(req.params.id);
})
module.exports = router