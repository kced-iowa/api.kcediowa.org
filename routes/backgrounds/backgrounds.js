const express = require('express');
const multer = require('multer');
const router = express.Router()
const backgroundData = require('../../models/backgrounds/backgrounds')
const fs = require('fs')
const dir = './cdn/backgrounds'

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, dir)
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "" + file.originalname)
    }
})

const upload = multer({
    storage: storage
})

router.get('/', async (req, res) => {
    try {
        const backgrounds = await backgroundData.find()
        res.json(backgrounds)
    }  catch (err) {
        res.status(400).json({ message: err.message });
    }
})

router.post('/', upload.single('file'), async (req, res) => {
    const background = new backgroundData({
        file: req.file.filename
    })
    try {
        const newBackground = await background.save()
        res.status(201).json(newBackground)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

router.patch('/:id', getBackground, upload.single('file'), async (req, res) => {
    // FIX THIS
    // if (req.file.filename !== res.background.file) {
    //     fs.unlinkSync(dir + '/' + res.background.file)
    // }
    res.background.file = req.file.filename
    try {
        const updatedBackground = await res.background.save()
        res.status(200).json(updatedBackground)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

async function getBackground(req, res, next) {
    let background
    try {
        background = await backgroundData.findById(req.params.id)
        if (background == null) {
            return res.status(404).json({ message: 'Cannot find background' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.background = background
    next()
}

module.exports = router;