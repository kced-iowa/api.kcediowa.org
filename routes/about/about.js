const express = require('express');
const router = express.Router();
const aboutt = require('../../models/about/about');

router.get('/', async (req, res) => {
    try {
        const about = await aboutt.find();
        res.json(about);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

module.exports = router;