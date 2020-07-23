const express = require('express')
const router = express.Router()
const { Game } = require('./models.js')
const ss = require('seededshuffle')

router.get('/', (req, res) => {
  return res.render('pages/index', {})   
})

router.get('/rooms', (req, res) => {
  // show all rooms
  var currentRooms = Game.find({ phase: 0 })
  var nums = []
  for (var i=0; i< currentRooms.length; i++) {
    nums.push(currentRooms[i].room)
  }
  res.render('pages/index', { roomNums: nums })  
})

router.get('/room/', (req, res) => {
  var shuffled = ss.shuffle(cards, '1234', true)
  res.send()
})

router.post('/newgame', (req, res) => {
  let socketId = req.body.socketId
  let roomId = Math.floor(Math.random() * 10000)
  let randomSeed = Math.random().toString(36).substring(8)
  // create a new room and send 
  let newGame = new Game({
    p1SocketId: socketId,
    room: roomId,
    seed: randomSeed,
    phase: 0
  })
  newGame.save()
  console.log('new game ' + roomId)
  return res.send({ status: 'success', room: roomId })
})

router.post('/join', (req, res) => {
  var roomNum = req.body.room
  Game.findOne({ room : roomNum })
  .then((existingGame) => {
    // if not exist, return error message
    if (!existingGame) {
      return res.send({'status': 'no_such_room'})
    }
    // if exist, join as 2nd player
    existingGame.p2SocketId = req.body.socketId
    var shuffled = ss.shuffle(req.app.locals.cards, existingGame.seed, true)
    // TODO: notify 1st player game is about to start
    var io = req.app.locals.io
    io.sockets.to(existingGame.p1SocketId).emit('startGame', '')
    existingGame.save()
    return res.send({ status: 'start', parent: false, hand: shuffled }) //TODO figure out 親家子家
  })
  .catch((err) => {
    console.log(err)
    // if other error, return general error message
    return res.send({'status': 'error'})
  })
})


module.exports = router
