const express = require('express')
const expressValidator = require('express-validator')
const path = require('path')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const flash = require('connect-flash')
const morgan = require('morgan')
const {Database} = require('./database.js')
const common = require('./common.js')
const login = require('./login.js')
const stone = require('./stone.js')

// app and middlewares 
const app = express()
app.use(express.static(path.resolve(__dirname, common.HTML_PATH)))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(session({
    secret: 'myappistombstonehaha',
    resave: false,
    saveUninitialized: false,
    //cookie: { secure: true }
  }))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use(morgan('tiny'))
app.use(expressValidator())

// routes
app.get('/', (req, res) => {
    login.getLogin(req, res)
})

app.post('/login', (req, res, next) => {
    login.postLogin(req, res, next, passport)
})

app.post('/register', (req, res) => {
    login.postRegister(req, res, database)
})


app.get('/logout', (req, res) => {
    login.getLogout(req, res)
})

app.get('/main', (req, res) => {
    if(req.isAuthenticated()){
        const filePath = path.resolve(__dirname, common.HTML_PATH, 'main.html')
        res.sendFile(filePath)
    }else{
        res.redirect('/')
    }
})

app.get('/api/stones', (req, res) => {
    stone.getStones(req, res, database)
})

app.post('/api/stone', (req, res) => {
    stone.addStone(req, res, database)
})


app.delete('/api/delete', (req, res) => {
    stone.deleteStone(req, res, database)
})

app.use((req, res) => {
    res.type('text/plain')
    res.status(404)
    res.send('404 Not Found')
})

app.use( (error, req, res, next) => {
    console.log(error.stack)
    res.status(500)
    res.type('text/plain')
    res.send('505 Internal Server Error')
})

// passport
passport.use(new LocalStrategy(
    (name, password, done) => login.loginMatch(name, password, done, database)
))

passport.serializeUser(function(user, done) {
    done(null, user);
});
  
passport.deserializeUser(function(user, done) {
    done(null, user)
});



const database = new Database()
database.connect( () => {
    app.listen(3000, () => console.log('server listening on 3000'))
})
