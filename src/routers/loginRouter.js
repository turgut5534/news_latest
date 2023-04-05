const express = require('express')
const router = new express.Router()
const passport = require('../utils/passport')
const db = require('../db/postresql')

router.get('/login', (req,res) => {

    if(req.user) {
      return res.redirect('/')
    }

    return res.render('login/login')
})

router.post('/login', async function(req, res, next) {

  try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    return res.status(401).json({ message: 'Veritabanına bağlanılamıyor' });
  }

  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }

    const { email, password } = req.body

    if(!email || !password) {
      return res.status(401).json({ message: 'Tüm alanlar zorunludur.' });
    }

    if (!user) {
      return res.status(401).json({ message: 'Mail veya şifre hatalı' });
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.status(200).json({ message: 'Giriş Başarılı!' });
    });
  })(req, res, next);
});

router.get('/logout', (req,res) => {

  req.logout((err) => {
      if(err) {
          return next(err)
      }
  });
  res.redirect('/login')
})

router.get('*', (req,res) => {

  if(!req.user) {
    return res.redirect('/login')
  }

  res.render('404/404')

})

module.exports = router;