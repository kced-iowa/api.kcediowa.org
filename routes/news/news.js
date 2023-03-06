const express = require('express');
const router = express.Router();
const newsData = require('../../models/news/news');

router.get('/', async (req, res) => {
    try {
        const news = await newsData.find();
        res.json(news);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

module.exports = router;