db = new Mongo().getDB('tombstome')
db.stones.remove({})

const stones= [
    {
        name: 'Jason',
        location:[20, 30]
    },
    {
        name: 'Bill',
        location:[10, 98]
    },
    {
        name: 'Rose',
        location:[128, 890]
    },
]

db.stones.insert(stones)