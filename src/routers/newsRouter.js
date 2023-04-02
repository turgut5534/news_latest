const express = require('express')
const router = new express.Router()
const News = require('../models/News')
const NewsTags = require('../models/NewsTags')
const Tags = require('../models/Tags')
const User = require('../models/User')
const Reaction = require('../models/Reaction')
const fs = require('fs')
const isLoggedIn = require('../middlewares/auth')
const multer = require('multer')
const { v4: uuidv4 } = require('uuid');
const path = require('path')
const uploadDirectory = path.join(__dirname, '../../uploads')
const crypto = require('crypto')
const UserPassword = require('../models/UserPassword')


router.get('/', (req,res) => {
  res.redirect('/news')
})

router.get('/news', isLoggedIn,  async (req, res) => {

  try {

    const news =await News.findAll({
      include: User
    })
    res.render('news/news', {
      news: news
    })

  } catch (e) {
     res.status(400).send(e)
  }

})

router.get('/news/add', isLoggedIn,  async (req, res) => {
  
  const tags = await Tags.findAll()

  res.render('news/add', {tags})
})


router.get('/news/edit/:id',isLoggedIn, async(req,res) => {

  try {

    const news = await News.findByPk(req.params.id, {
      include: [
        {
          model: NewsTags,
          include: [
            {
              model: Tags,
            }
          ]
        },
      ],
    });

    const tags = await Tags.findAll()

    res.render('news/edit', {news, tags})
  } catch(e) {
    console.log(e)
    res.status(400).send(e)
  }
  
})

router.post('/update', isLoggedIn, async(req,res) => {
  
  const { id, title, description, lang, tags } = req.body
  
  try {

    const theNews = await News.findByPk(id)

    if(theNews.length == 0) {
      return res.status(500).send()
    }

    await News.update({ title: title, description: description, authorId: 1, lang:lang, updated_at: new Date().toISOString() }, {
      where: { id: id },
      returning: true
    })

    // const allTags = await NewsTag.findAll({
    //   where: { news_id: theNews.id },
    //   include: [Tags]
    // });
    

    // const tagNames = allTags.map(tag => tag.Tag.name);
    // console.log(tagNames)
 

    // get unchecked tags
    // const checkedTags = tags
    // const uncheckedTags = allTags.filter(tag => !checkedTags.includes(tag));



    for(const tag of tags) {

        const checkTagNews = await NewsTags.findOne({ where: { news_id: theNews.id, tag_id: tag } });

        if(!checkTagNews) {
            await NewsTags.create({
              news_id : theNews.id,
              tag_id: tag
            })
        }

    }

    res.redirect('/news')

  } catch(e) {
    res.send(e)
  }

})

router.get('/delete/:id', isLoggedIn,  async (req, res) => {

  console.log(req.params.id)

  try {

    const deletedNews = await News.destroy({ where: { id: req.params.id } });

    if (deletedNews.image) {

      const path = uploadDirectory + '/' + deletedNews.image
      await fs.promises.unlink(path)

    }

    await NewsTags.destroy({ where: { news_id: deletedNews.id } })

    res.status(200).json({ "status": true })

  } catch (e) {
    res.status(400).send(e)
  }

})


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueId = uuidv4();
    const ext = path.extname(file.originalname);
    cb(null, uniqueId + ext);
  }
});

const upload = multer({ storage: storage });


router.post('/save', isLoggedIn, upload.single('image'), async (req, res) => {

  const { title, description, lang, tags } = req.body

  try {

    const newsRow = await News.create({
      title: title,
      description: description,
      authorId: 1,
      image: req.file.filename,
      lang: lang,
      created_at: new Date().toISOString('tr-TR'),
      updated_at: new Date().toISOString('tr-TR')
    })

    if (!tags || tags.length === 0) {
      return res.redirect('/news')
    }

    const newsId = newsRow.id;


    for (const tag of tags) {

      console.log(tag)

      const gotTag = await Tags.findByPk(tag)

      await NewsTags.create({
        news_id: newsId,
        tag_id: gotTag.id
      })

    }

    res.redirect('/news')

  } catch (e) {
    console.log(e)
    res.status(401).send(e)
  }

});

router.get('/news/delete/:id', isLoggedIn,  async(req,res) => {

  try {

    const news = await News.findByPk(req.params.id)
    console.log("The new is ___________________:" + news)

    if(news.image) {

      const path = uploadDirectory + '/' + news.image
      await fs.promises.unlink(path)
      
    }

    await NewsTags.destroy({ where: { news_id: news.id } })
    await News.destroy({ where: { id: req.params.id }, returning: true, })
 
    res.status(200).json({"status" : true})
    
  } catch(e) {
    console.log(e)
    res.status(401).send(e)
  }

})


module.exports = router;