const express = require('express');
const router = express.Router();
const multer = require('multer');
const dir = './cdn/news'
const newsData = require('../../models/news/news');

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, dir)
    },
    filename: (req, res, cb) => {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({
    storage: storage
})

router.get('/', async (req, res) => {
    try {
        const news = await newsData.find();
        res.json(news);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})
router.post('/', upload.single('file'), async (req, res) => {
    const news = new newsData({
        authot: req.body.author,
        date: req.body.date,
        title: req.body.title,
        metadata: req.body.metadata,
        file: req.file!==undefined ? req.file.filename : null
    })
})

module.exports = router;