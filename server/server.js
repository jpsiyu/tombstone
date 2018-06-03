'use strict'
const express = require('express')
const path = require('path')
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const flash = require('connect-flash')
const morgan = require('morgan')
const Database = require('./database.js')

// constant info
const MSG_SERVER_ERROR = 'Internal Server Error'
const HTML_PATH = '../client/public'
const saltRounds = 10

const serverMsg = (res, statusCode, isOk, message, data) => {
    const m = {
        ok: isOk,
        message,
        data
    }
    console.log(m)
    res.status(statusCode).json(m)
}
const serverErrMsg = res => serverMsg(res, 500, false,  MSG_SERVER_ERROR, null) 


// app and middlewares 
const app = express()
app.use(express.static(path.resolve(__dirname, HTML_PATH)))
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


// routes
app.get('/', (req, res) => {
    const filePath = path.resolve(__dirname, HTML_PATH, 'register.html')
    res.sendFile(filePath)
})

app.post('/register', (req, res) => {
    const user = {
        name: req.body.name,
        password: req.body.password,
    }
    bcrypt.hash(user.password, saltRounds, (err, hash) => {
        user.password = hash
        const errCallback = () => serverErrMsg(res)
        const insertUserCallback = result => {
            if(result.insertedId){
                req.login(result.insertedId, err => {
                    serverMsg(res, 200, true, `add user ${user.name} success`, null)
                })
            }else{
                serverMsg(res, 200, false, `add user ${user.name} failed`, null)
            } 
        }
        const findUserCallback = result => {
            if(result !== null){
                serverMsg(res, 200, false, `${user.name} already exits`, null)
                return
            }
            database.insertUser(user, insertUserCallback, errCallback)
        }
        database.findUserByName(user.name, findUserCallback, errCallback)
    })
})

app.get('/login',  (req, res, next) => {
    if(req.isAuthenticated()){
        res.redirect('/main')
    }else{
        const filePath = path.resolve(__dirname, HTML_PATH, 'login.html')
        res.sendFile(filePath)

    }
})

app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(err){
            serverMsg(res, 500, false,  MSG_SERVER_ERROR, null)
        }else if(!user){
            serverMsg(res, 200, false,  info.message, null)
        }else{
            req.login(user._id, err => {
                serverMsg(res, 200, true,  info.message, user)
            })
        }
    })(req, res, next)
})

app.get('/logout', (req, res) => {
    if(req.isAuthenticated())
        req.logout()
    res.redirect('/')
})

app.get('/main', (req, res) => {
    if(req.isAuthenticated()){
        const filePath = path.resolve(__dirname, HTML_PATH, 'main.html')
        res.sendFile(filePath)
    }else{
        res.redirect('/')
    }
})

app.get('/api/stones', (req, res) => {
    const fetchSucc = stones => res.json(stones)
    database.fetchStones(fetchSucc, serverErrMsg)
})

app.post('/api/stone', (req, res) => {
    const stone = req.body
    const findCallback = newStone => res.json(newStone)
    const insertCallback = result => {
        if(result && result.insertedId)
            database.findStoneById(result.insertedId, findCallback, serverErrMsg)
    }
    database.insertStone(stone, insertCallback, serverErrMsg)
})


app.delete('/api/delete', (req, res) => {
    const id = ObjectId(req.query._id)
    const deleteSucc = () => serverMsg(res, 200, true, {message: 'ok'}, null)
    database.deleteStoneById(id, deleteSucc, serverErrMsg)
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
    {
        usernameField: 'name',
        passwordField: 'password',
    },
    (name, password, done) => {
        const findUserCallback = user => {
            if(user === null){
                done(null, false, {message: 'no user'})
            }
            bcrypt.compare(password, user.password, (err, compareResult) => {
                if(compareResult !== true){
                    done(null, false, {message: 'wrong password'})
                }else{
                    done(null, user, {message: 'login success'})
                }
            }).catch( err => done(err))
        }
        database.findUserByName(name, findUserCallback)
    }
))

// serialize to sesstion
passport.serializeUser(function(userId, done) {
    done(null, userId);
});
  
passport.deserializeUser(function(userId, done) {
    done(null, userId)
});



let db
const database = new Database()
database.connect( () => {
    app.listen(3000, () => console.log('server listening on 3000'))
    db = database.db
})
