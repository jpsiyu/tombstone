const common = require('./common.js')
const {Stone} = require('./database.js')

const getStones = (req, res, database) => {
    const fetchSucc = stones => res.json(stones)
    const owner = req.user._id
    database.fetchStones(owner, fetchSucc, () => common.serverErrMsg(res))
}

const addStone = (req, res, database) => {
    const stone = new Stone({
        owner: req.user._id, 
        name: req.body.name,
        location: req.body.location,
        age: req.body.age,
    })
    const insertCallback = stone => {
        if(stone)
            res.json(stone)
    }
    database.insertStone(stone, insertCallback, ()=>common.serverErrMsg(res))
}

const deleteStone = (req, res, database) => {
    const id = req.query._id
    const owner = req.user._id
    const deleteSucc = () => common.serverMsg(res, 200, true, {message: 'ok'}, null)
    database.deleteStoneById(id, owner, deleteSucc, ()=>common.serverErrMsg(res))
}

module.exports = {
    getStones,
    addStone,
    deleteStone,
}