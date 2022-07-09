const express = require('express');
const router = express.Router();
const businesses = require('../../models/business/business');

router.get('/', async (req, res) => {
    try {
        const busines = await businesses.find();
        res.json(busines);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})
router.get('/:id', async (req, res) => {
    try {
        const busines = await businesses.find();
        res.json(busines);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

module.exports = router;