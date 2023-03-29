const express = require('express');
const fs = require('fs');
const router = express.Router();
const multer = require('multer');
const dir = './cdn/news'
const newsData = require('../../models/news/news');

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, dir)
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname)
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
        author: req.body.author,
        date: req.body.date,
        title: req.body.title,
        metadata: req.body.metadata,
        file: req.file!==undefined ? req.file.filename : ''
    })
    try {
        const newNews = await news.save()
        res.status(201).json(newNews)
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})
router.delete('/:id', getNews, async (req, res) => {
    try {
        await res.news.remove()
        if (res.news.file !== "" || undefined) {
            fs.unlinkSync(dir + '/' + res.news.file)
        }
        res.status(200).json({ message: "Event deleted successfully."})
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})
async function getNews (req, res, next) {
    let news
    try {
        news = await newsData.findById(req.params.id);
        if (news == null) {
            return res.status(404).json({ message: 'Cannot find news' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.news = news
    next()
}
module.exports = router;