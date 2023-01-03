const express = require('express');
const multer = require('multer');
const dir = './cdn/members'
const router = express.Router();
const Member = require('../../models/about/member');


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
router.post('/', upload.single('image'), async (req, res) =>{
    const member = new Member({
        name: req.body.name,
        occupation: req.body.occupation,
        bio: req.body.bio,
        join: req.body.join,
        image: req.file!==undefined ? req.file.filename : ''
    })
    try {
        const newMember = await member.save()
        res.status(201).json(newMember)
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})
router.patch('/:id', getMember, async (req, res) => {
    res.member.name = req.body.name
    res.member.occupation = req.body.occupation
    res.member.bio = req.body.bio
    res.member.join = req.body.join
    try {
        const updatedMember = await res.member.save()
        res.json(updatedMember)
    } catch (err) {
        res.status(400).json({ message: err.message })
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