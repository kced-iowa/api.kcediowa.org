const express = require('express');
const router = express.Router();
const Business = require('../../models/business/business');

router.get('/', async (req, res) => {
    try {
        const businesses = await Business.find();
        res.json(businesses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})
router.get('/:id', getBusiness, async (req, res) => {
    res.json(res.business)
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