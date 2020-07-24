const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const http = require('http').Server(app)
require('dotenv').config()
const io = require('socket.io')(http)
const routes = require('./routes.js')
const mongoose = require('mongoose')
const { getStartingHand, getAllTiles } = require('./utils.js')

app.set('view engine', 'ejs')
app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const dbUrl = process.env.DBURL


io.on('connection', (socket) => {
  console.log(`a user ${socket.id} is connected`)
  socket.on('disconnect', (reason) => {
    console.log(reason)
  })
  socket.on('gameStart', (socketId, seed, cursor) => {
    let p1hand = getStartingHand(0, seed)
    let tiles = getAllTiles(seed)
    io.to(socketId).emit('gameStart', p1hand, cursor, tiles)
  })
})

app.locals.io = io

app.use('/', routes)

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true } , (err) => {
  console.log('mongodb connected', err);
})

var server = http.listen(3001, () => {
  console.log('server is running on port', server.address().port);
})
