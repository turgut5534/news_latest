const express = require('express')
const router = new express.Router()
const Tag = require('../models/Tags')
const NewsTag = require('../models/NewsTags')
const NewsTags = require('../models/NewsTags')
const isLoggedIn = require('../middlewares/auth')

router.get('/tags', isLoggedIn, async (req, res) => {

    try {

        const tags = await Tag.findAll()
        res.render('tags/tags', {
            tags: tags
        })

    } catch (e) {
        res.status(400).send(e)
    }

})

router.post('/tags/save', isLoggedIn, async (req, res) => {

    try {
        const name = req.body.name
        const newTag = await Tag.create({ name })

        res.status(201).json({ id: newTag.id, name: newTag.name })

    } catch (e) {
        console.log(e)
        res.status(401).send(e)
    }

})

router.get('/tags/delete/:id', isLoggedIn, async (req, res) => {

    try {

        const tag = await Tag.findByPk(req.params.id)
        const newsTags = await NewsTag.findOne({ where: { tag_id: tag.id } });

        if (newsTags) {
            newsTags.destroy()
        }

        tag.destroy()

        res.status(200).send()

    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }


})

router.post('/tags/update', isLoggedIn, async (req, res) => {

    try {

        const [numUpdatedRows, affectedRows] = await Tag.update({ name: req.body.name }, {
            where: { id: req.body.id },
            returning: true
        })
        
        const updatedTag = affectedRows[0]

        res.status(201).json({ id: updatedTag.id, name: updatedTag.name })

    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }

})
module.exports = router;