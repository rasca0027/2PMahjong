var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');
var ss = require('seededshuffle');

app.set('view engine', 'ejs')
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

const cards = [
  '1s', '2s', '3s', '4s', '5s', '6s', '7s', '8s', '9s',
  '1s', '2s', '3s', '4s', '5s', '6s', '7s', '8s', '9s',
  '1s', '2s', '3s', '4s', '5s', '6s', '7s', '8s', '9s',
  '1s', '2s', '3s', '4s', '5s', '6s', '7s', '8s', '9s',
  '1p', '2p', '3p', '4p', '5p', '6p', '7p', '8p', '9p',
  '1p', '2p', '3p', '4p', '5p', '6p', '7p', '8p', '9p',
  '1p', '2p', '3p', '4p', '5p', '6p', '7p', '8p', '9p',
  '1p', '2p', '3p', '4p', '5p', '6p', '7p', '8p', '9p',
  '1m', '2m', '3m', '4m', '5m', '6m', '7m', '8m', '9m',
  '1m', '2m', '3m', '4m', '5m', '6m', '7m', '8m', '9m',
  '1m', '2m', '3m', '4m', '5m', '6m', '7m', '8m', '9m',
  '1m', '2m', '3m', '4m', '5m', '6m', '7m', '8m', '9m',
  'e', 's', 'w', 'n', 'pai', 'chong', 'fa',
  'e', 's', 'w', 'n', 'pai', 'chong', 'fa',
  'e', 's', 'w', 'n', 'pai', 'chong', 'fa',
  'e', 's', 'w', 'n', 'pai', 'chong', 'fa',
]
const dbUrl = 'mongodb+srv://admin:xhwir9rW4MYfKaQ@cluster0-q2y8k.mongodb.net/test?retryWrites=true&w=majority'

const Game = mongoose.model('Game',{
  room: String,
  seed : String,
  p1SocketId: String,
  p2SocketId: String,
  p1Discard: String,
  p2Discard: String,
  phase: Number // 0: not started, 1: A, 2: B, 3: end
})

app.get('/', (req, res) => {
  return res.render('pages/index', {})   
})

app.get('/rooms', (req, res) => {
  // show all rooms
  var currentRooms = Game.find({ phase: 0 })
  var nums = []
  for (var i=0; i< currentRooms.length; i++) {
    nums.push(currentRooms[i].room)
  }
  res.render('pages/index', {roomNums: nums})  
})

app.get('/room/', (req, res) => {
  var shuffled = ss.shuffle(cards, '1234', true)
    
  res.send()
})
app.post('/newgame', (req, res) => {
  let socketId = req.body.socketId
  let roomId = Math.floor(Math.random() * 10000)
  let seed = Math.random().toString(36).substring(8)
  // create a new room and send 
  let newGame = new Game({
    p1SocketId: socketId,
    room: roomId,
    seed: randomSeed,
    phase: 0
  })
  newGame.save()
})
app.post('/join', (req, res) => {
  var roomNum = req.body.room
  var existingGame = Game.find({ room : roomNum })
  // if not exist, return error message
    
  // if exist, check
})




io.on('connection', (socket) =>{
  console.log(`a user ${socket.id} is connected`)
})

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true } , (err) => {
  console.log('mongodb connected', err);
})

var server = http.listen(3001, () => {
  console.log('server is running on port', server.address().port);
});
