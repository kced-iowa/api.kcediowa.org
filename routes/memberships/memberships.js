const express = require('express')
const router = express.Router()
const membershipData = require('../../models/memberships/memberships')

router.get('/', async (req, res) => {
    try {
        const membership = await membershipData.find()
        res.json(membership)
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.post('/', async (req, res) => {
    try {
        await membershipData.create(req.body)
        res.status(201).json({ success: true })
    } catch (error) {
        res.status(400).json({ success: false })
    }
})

router.delete('/:id', getMembership, async (req, res) => {
    try {
        await res.membership.remove()
        res.status(200).json({ message: 'Removed'})
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})

async function getMembership(req, res, next) {
    let membership
    try {
        membership = await membershipData.findById(req.params.id)
        if (membership == null) {
            return res.status(404)
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.membership = membership
    next()
}

module.exports = router;