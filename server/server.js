'use strict'
const express = require('express')
const path = require('path')
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId
const bodyParser = require('body-parser')

const app = express()
app.use(express.static(path.resolve(__dirname, '../client')))
app.use(bodyParser.json())

app.get('/bootstrap', (req, res) => {
    const filePath = path.resolve(__dirname, '../client/bootstrap.html')
    res.sendFile(filePath)
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
    console.log('404')
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

let db
MongoClient.connect('mongodb://localhost').then(connection => {
    db = connection.db('tombstone')
    app.listen(3000, () => console.log('server listening on 3000'))
}).catch(error => {
    console.log('ERR', error)
})
