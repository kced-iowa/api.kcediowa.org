const express = require('express')
const router = express.Router()
const multer = require('multer')
const dir = './cdn/townships'
const townshipData = require('../../models/townships/townships')

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
        const townships = await townshipData.find()
        res.json(townships)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get('/:id', getTownship, async (req, res) => {
    res.json(res.township)
})

const uploadFields = upload.fields([{name: 'coverImg'}, {name: 'mainImg'}])

router.post('/', uploadFields, async (req, res) => {
    const township = new townshipData({
        name: req.body.name,
        url: req.body.url,
        mapsAddress: req.body.mapsAddress,
        socials: JSON.parse(req.body.socials),
        about: req.body.about,
        coverImg: req.files['coverImg']!==undefined ? req.files['coverImg'][0]['filename'] : 'Black.jpg',
        mainImg: req.files['mainImg']!==undefined ? req.files['mainImg'][0]['filename'] : 'Black.jpg'
    })
    try {
        const newTownship = await township.save()
        res.status(201).json(newTownship)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.patch('/:id', getTownship, uploadFields, async (req, res) => {
    res.township.name = req.body.name,
    res.township.url = req.body.url,
    res.township.mapsAddress = req.body.mapsAddress,
    res.township.socials = JSON.parse(req.body.socials),
    res.township.about = req.body.about,
    res.township.coverImg = req.body.coverImg || req.files['coverImg'][0]['filename']
    res.township.mainImg = req.body.mainImg || req.files['mainImg'][0]['filename']
    try {
        const updatedTownship = await res.township.save()
        res.json(updatedTownship)
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})

router.delete('/:id', getTownship, async (req, res) => {
    try {
        await res.township.remove()
        res.status(200).json({ message: "Deleted" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getTownship (req, res, next) {
    let township
    try {
        township = await townshipData.findById(req.params.id)
        if (township == null) {
            return res.status(404).json({ message: "Missing township"})
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.township = township
    next()
}

module.exports = router;