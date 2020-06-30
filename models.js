const mongoose = require('mongoose');

const Game = mongoose.model('Game',{
  room: String,
  seed : String,
  p1SocketId: String,
  p2SocketId: String,
  p1Discard: String,
  p2Discard: String,
  phase: Number // 0: not started, 1: A, 2: B, 3: end
})

exports.Game = Game
