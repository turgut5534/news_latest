require('./db/postresql')
const express = require('express')
const path = require('path')
const newsRouter = require('./routers/newsRouter')
const tagsRouter = require('./routers/tagsRouter')
const loginRouter = require('./routers/loginRouter')
const port = process.env.PORT || 3000
const session = require('express-session');
const bodyParser = require('body-parser')
const passport = require('./utils/passport')

const viewsDir = path.join(__dirname, '../templates/views')
const publicDir = path.join(__dirname, '../public')
const uploadDirectory = path.join(__dirname, '/../uploads')

const app = express()

app.set('views', viewsDir);
app.set('view engine', 'ejs')

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
  });

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(viewsDir))
app.use(express.static(publicDir))
app.use(express.static(uploadDirectory))
app.use(express.json())
app.use(newsRouter)
app.use(tagsRouter)
app.use(loginRouter)


app.listen(port, () => {
    console.log(`Server is up on ${port}`)
})
