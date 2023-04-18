const express = require('express')
const router = express.Router()
const multer = require('multer')
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

})

router.post('/', async (req, res) => {

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

module.export = router;