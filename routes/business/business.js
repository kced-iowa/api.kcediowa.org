const express = require('express');
const router = express.Router();
const Business = require('../../models/business/business');
const dir = './cdn/business'
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, dir)
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({
    storage: storage
})

var uploadFields = upload.fields([{name: 'coverimg'}, {name: 'mainimg'}, {name: 'contactimg'}])

router.get('/', async (req, res) => {
    try {
        const businesses = await Business.find().sort({ name: 1});
        res.json(businesses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})
router.get('/:id', getBusiness, async (req, res) => {
    res.json(res.business)
})
router.post('/', uploadFields, async (req, res) => {
    const business = new Business({
        name: req.body.name,
        type: req.body.type,
        phone: req.body.phone,
        address: req.body.address,
        bio: req.body.bio,
        website: req.body.website,
        socials: JSON.parse(req.body.socials),
        coverimg: req.files['coverimg']!==undefined ? req.files['coverimg'][0]['filename'] : 'Black.jpg',
        mainimg: req.files['mainimg']!==undefined ? req.files['mainimg'][0]['filename'] : 'Black.jpg',
        contactimg: req.files['contactimg']!==undefined ? req.files['contactimg'][0]['filename'] : 'Black.jpg',
        contact: JSON.parse(req.body.contact),
        keywords: JSON.parse(req.body.keywords)
    })
    try {
        const newBusiness = await business.save()
        res.status(201).json(newBusiness)
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})
router.patch('/:id', getBusiness, uploadFields, async (req, res) => {
    res.business.name = req.body.name
    res.business.type = req.body.type
    res.business.phone = req.body.phone
    res.business.address = req.body.address
    res.business.bio = req.body.bio
    res.business.website = req.body.website
    res.business.socials = JSON.parse(req.body.socials),
    res.business.coverimg = req.body.coverimg || req.files['coverimg'][0]['filename']
    res.business.mainimg = req.body.mainimg || req.files['mainimg'][0]['filename']
    res.business.contactimg = req.body.contactimg || req.files['contactimg'][0]['filename']
    res.business.contact = JSON.parse(req.body.contact)
    res.business.keywords = JSON.parse(req.body.keywords)
    try {
        const updatedBusiness = await res.business.save()
        res.json(updatedBusiness)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})
router.delete('/:id', getBusiness, async (req, res) => {
    try {
        await res.business.remove()
        res.status(200).json({ message: "Business deleted successfully."})
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})
async function getBusiness (req, res, next) {
    let business
    try {
        business = await Business.findById(req.params.id)
        if (business == null) {
            return res.status(404).json({ message: 'Cannot find business' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.business = business
    next()
}

module.exports = router;