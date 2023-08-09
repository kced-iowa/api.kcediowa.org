const express = require('express');
const router = express.Router();
const aboutData = require('../../models/about/about');

router.get('/', async (req, res) => {
    try {
        const about = await aboutData.find();
        res.json(about);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.get('/:id', getAbout, async (req, res) => {
    res.json(res.about)
})

router.post('/', async (req, res) => {
    const about = new aboutData({
        title: req.body.title,
        content: req.body.content
    })
    try {
        const newAbout = await about.save()
        res.status(201).json(newAbout)        
    }  catch (err) {
        res.status(400).json({ message: err.message });
    }
})

router.patch('/:id', getAbout, async (req, res) => {
    res.about.title = req.body.title
    res.about.content = req.body.content
    try {
        const updatedAbout = await res.about.save()
        res.status(201).json(updatedAbout)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

router.delete('/:id', getAbout, async (req, res) => {
    try {
        await res.about.remove()
        res.json({ message: 'Deleted about' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getAbout(req, res, next) {
    let about
    try {
        about = await aboutData.findById(req.params.id)
        if (about == null) {
            return res.status(404).json({ message: 'Cannot find about' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.about = about
    next()
}

module.exports = router;