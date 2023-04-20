const express = require('express')
const router = express.Router()
const multer = require('multer')
const dir = './cdn/recreation'
const recreationData = require('../../models/recreation/recreation')

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
        const recreations = await recreationData.findOne()
        res.json(recreations)
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

const uploadFields = upload.fields([{name: 'coverImg'}, {name: 'mainImg'}])

router.post('/', uploadFields, async (req, res) => {
    const recreation = new recreationData({
        name: req.body.name,
        url: req.body.url,
        mapsAddress: req.body.mapsAddress,
        socials: req.body.socials,
        coverImg: req.files['coverimg']!==undefined ? req.files['coverimg'][0]['filename'] : 'Black.jpg',
        mainImg: req.files['mainimg']!==undefined ? req.files['mainimg'][0]['filename'] : 'Black.jpg'
    })
    try {
        const newRecreation = await recreation.save()
        res.status(201).json(newRecreation)
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})

router.patch=('/:id', getRecreation, uploadFields, async (req, res) => {
    res.recreation.name = req.body.name,
    res.recreation.url = req.body.url,
    res.recreation.mapsAddress = req.body.mapsAddress,
    res.recreation.socials = req.body.socials,
    res.recreation.coverImg = req.files['coverImg']!==undefined ? req.files['coverImg'][0]['filename'] : 'Black.jpg',
    res.recreation.mainImg = req.files['mainImg']!==undefined ? req.files['mainImg'][0]['filename'] : 'Black.jpg'
    try {
        const updatedRecreation = await res.recreation.save()
        res.json(updatedRecreation)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

router.delete('/:id', getRecreation, async (req, res) => {
    try {
        await res.recreation.remove()
        res.status(200).json({ message: "Deleted" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getRecreation (req, res, next) {
    let recreation
    try {
        recreation = await townshipData.findById(req.params.id)
        if (recreation == null) {
            return res.status(404).json({ message: "Missing recreation"})
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.recreation = recreation
    next()
}

module.exports = router;