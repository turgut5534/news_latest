const express = require('express')
const router = new express.Router()

router.get('/login', (req,res) => {

    if(req.user) {
      return res.redirect('/')
    }

    return res.render('login/login')
})

module.exports = router;