'use strict'
const express = require('express')
const path = require('path')
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId
const bodyParser = require('body-parser')

const MSG_SERVER_ERROR = 'Internal Server Error'

const app = express()
app.use(express.static(path.resolve(__dirname, '../client')))
app.use(bodyParser.json())

app.get('/register', (req, res) => {
    const filePath = path.resolve(__dirname, '../client/register.html')
    res.sendFile(filePath)
})

app.post('/api/register', (req, res) => {
    const user = req.body
    const collection = db.collection('user')
    collection.findOne({name: user.name}).then(result => {
        if(result !== null){
            serverMsg(res, 200, false, `${user.name} already exits`, null)
            return
        }
        collection.insertOne(user).then(result => {
            if(result.insertedId){
                serverMsg(res, 200, true, `add user ${user.name} success`, null)
            }else{
                serverMsg(res, 200, false, `add user ${user.name} failed`, null)
            }
        })
    }).catch(err => {
        console.log(err)
        serverMsg(res, 500, false, MSG_SERVER_ERROR, null)
    })
})

app.get('/api/stones', (req, res) => {
    db.collection('stones').find().toArray().then(stones => {
        res.type('json')
        res.json(stones)
    }).catch(err => {
        console.log(err)
        res.status(500).json({message: 'Internal Server Error'})
    })
})

app.post('/api/stone', (req, res) => {
    const stone = req.body
    db.collection('stones').insertOne(stone).then(result => {
        return db.collection('stones').findOne({_id: result.insertedId})
    }).then(newStone => {
        res.json(stone)
    }).catch(err => {
        console.log(err)
        res.status(500).json({message: 'Internal Server Error'})
    })
})

app.delete('/api/delete', (req, res) => {
    const objId = ObjectId(req.query._id)
    console.log(req.query._id)
    db.collection('stones').deleteOne({_id: objId}).then(result => {
        if (result.result.ok)
            res.status(200).json({message: 'ok'})
        else
            res.status(500).json({message: 'Internal Server Error'})
    })
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

const serverMsg = (res, statusCode, isOk, message, data) => {
    const m = {
        ok: isOk,
        message,
        data
    }
    console.log(m)
    res.status(statusCode).json(m)
}

let db
MongoClient.connect('mongodb://localhost').then(connection => {
    db = connection.db('tombstone')
    app.listen(3000, () => console.log('server listening on 3000'))
}).catch(error => {
    console.log('ERR', error)
})
