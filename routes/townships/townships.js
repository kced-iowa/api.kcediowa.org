const express = require('express')
const router = express.Router()
const multer = require('multer')
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

})

router.post('/', async (req, res) => {

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

module.export = router;