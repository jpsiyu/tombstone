const bcrypt = require('bcrypt')
const passport = require('passport')
const common = require('./common.js')
const path = require('path')
const {User, Stone} = require('./database.js')

const saltRounds = 10

const getLogin = (req, res) => {
    if(req.isAuthenticated()){
        res.redirect('/main')
    }else{
        const filePath = path.resolve(__dirname, common.HTML_PATH, 'login.html')
        res.sendFile(filePath)
    }
}

const postLogin = (req, res, next, passport) => {
    passport.authenticate('local', (err, user, info) => {
        if(err){
            common.serverErrMsg(res)
        }else if(!user){
            common.serverMsg(res, 200, false,  info.message, null)
        }else{
            req.login(user, err => {
                common.serverMsg(res, 200, true,  info.message, user)
            })
        }
    })(req, res, next)
}

const postRegister = (req, res, database) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    })
    req.check('username', 'username length: [4, 20]').isLength({min: 4, max: 20})
    req.check('email', 'shoule match email fromat').isEmail().normalizeEmail()
    req.check('password', 'password length: [4,20]').isLength({min:6, max:20})
    const err = req.validationErrors()
    if(err){
        console.log("check err:", err)
        common.serverMsg(res, 200, false, JSON.stringify(err), null)
        return 
    }

    bcrypt.hash(user.password, saltRounds, (err, hash) => {
        user.password = hash
        const errCallback = () => common.serverErrMsg(res)
        const insertUserCallback = user => {
            if(user){
                req.login(user, err => {
                    common.serverMsg(res, 200, true, `add user ${user.username} success`, null)
                })
            }else{
                common.serverMsg(res, 200, false, `add user ${user.username} failed`, null)
            } 
        }
        const findUserCallback = db_user => {
            if(db_user !== null){
                const exitsMsg = db_user.username === user.username ?
                    `${db_user.username} already exists` :
                    `${db_user.email} already exists`
                common.serverMsg(res, 200, false, exitsMsg, null)
            }else
                database.insertUser(user, insertUserCallback, errCallback)
        }
        database.findUserByNameOrEmail(user.username, user.email, findUserCallback, errCallback)
    })
}

const getLogout = (req, res) => {
    if(req.isAuthenticated())
        req.logout()
    res.redirect('/')
}

const loginMatch = (nameOrEmail, password, done, database) => {
    const findUserCallback = user => {
        if(user === null){
            return done(null, false, {message: 'no user'})
        }
        bcrypt.compare(password, user.password, (err, compareResult) => {
            if(err){
                return done(err)
            }
            if(compareResult !== true){
                return done(null, false, {message: 'wrong password'})
            }else{
                return done(null, user, {message: 'login success'})
            }
        })
    }
    database.findUserByNameOrEmail(nameOrEmail, nameOrEmail, findUserCallback)
}

module.exports = {
    getLogin,
    postLogin,
    postRegister,
    getLogout,
    loginMatch,
}