const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId


class Database {
    constructor(){
        this.db = null
        this.userCollection = null
        this.stonesCollection = null
    }

    err(err, errCallback){
        if(errCallback)
            errCallback()
        console.log('Err', err)
    }

    // connect to database
    connect(callback){
        MongoClient.connect('mongodb://localhost').then(connection => {
            this.db = connection.db('tombstone')
            this.userCollection = this.db.collection('user')
            this.stonesCollection = this.db.collection('stones')
            callback()
        }).catch(err => this.err(err))
    }

    // find user by name
    findUserByName(name, callback, errCallback){
        this.userCollection.findOne({name})
            .then( user => callback(user))
            .catch(err => this.err(err, errCallback))
    }

    // insert user
    insertUser(user, callback, errCallback){
        this.userCollection.insertOne(user)
            .then( result => callback(result))
            .catch( err => this.err(err, errCallback))
    }

    // fetch stones
    fetchStones(callback, errCallback){
        this.stonesCollection.find().toArray()
            .then(stones => callback(stones))
            .catch( err => this.err(err, errCallback))
    }

    // insert stone
    insertStone(stone, callback, errCallback){
        this.stonesCollection.insertOne(stone)
            .then(result => callback(result))
            .catch(err => this.err(err, errCallback))
    }

    // find stone by id
    findStoneById(id, callback, errCallback){
        this.stonesCollection.findOne({_id: id})
            .then(stone => callback(stone))
            .catch(err => this.err(err, errCallback))
    }

    //delte stone by id
    deleteStoneById(id, callback, errCallback){
        const objId = ObjectId(id)
        this.stonesCollection.deleteOne({_id: objId})
            .then(result => callback(result))
            .catch(err => this.err(err, errCallback))
    }
}

module.exports = Database