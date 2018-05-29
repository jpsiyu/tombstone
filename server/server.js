const express = require('express')
const path = require('path')

const app = express()
app.use(express.static(path.resolve(__dirname, '../client')))

app.get('/', (req, res) => {
    res.type('html')
    res.sendFile('index.html')
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

app.listen(3000, () => console.log('server listening on 3000'))