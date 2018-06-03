const bcrypt = require('bcrypt')
const passport = require('passport')
const common = require('./common.js')
const path = require('path')

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
            req.login(user._id, err => {
                common.serverMsg(res, 200, true,  info.message, user)
            })
        }
    })(req, res, next)
}

const postRegister = (req, res, database) => {
    const user = {
        name: req.body.name,
        password: req.body.password,
    }
    bcrypt.hash(user.password, saltRounds, (err, hash) => {
        user.password = hash
        const errCallback = () => common.serverErrMsg(res)
        const insertUserCallback = result => {
            if(result.insertedId){
                req.login(result.insertedId, err => {
                    common.serverMsg(res, 200, true, `add user ${user.name} success`, null)
                })
            }else{
                common.serverMsg(res, 200, false, `add user ${user.name} failed`, null)
            } 
        }
        const findUserCallback = result => {
            if(result !== null){
                common.serverMsg(res, 200, false, `${user.name} already exits`, null)
                return
            }
            database.insertUser(user, insertUserCallback, errCallback)
        }
        database.findUserByName(user.name, findUserCallback, errCallback)
    })
}

const getLogout = (req, res) => {
    if(req.isAuthenticated())
        req.logout()
    res.redirect('/')
}

module.exports = {
    getLogin,
    postLogin,
    postRegister,
    getLogout,
}