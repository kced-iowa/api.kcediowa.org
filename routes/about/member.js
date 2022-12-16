const express = require('express');
const router = express.Router();
const Member = require('../../models/about/member');

router.get('/', async (req, res) => {
    try {
        const members = await Member.find();
        res.json(members);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})
router.get('/:id', getMember, async (req, res) => {
    res.json(res.member)
})
router.post('/', async (req, res) =>{
    const member = new Member({
        name: req.body.name,
        occupation: req.body.occupation,
        bio: req.body.bio,
        join: req.body.join
    })
    try {
        const newMember = await member.save()
        res.status(201).json(newMember)
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})
router.delete('/:id', getMember, async (req, res) => {
    try {
        await res.member.remove()
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})
async function getMember (req, res, next) {
    let member
    try {
        member = await Member.findById(req.params.id);
        if (member == null) {
            return res.status(404).json({ message: 'Cannot find member' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.member = member
    next()
}
module.exports = router