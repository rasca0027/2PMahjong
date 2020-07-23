const ss = require('seededshuffle')


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

function getStartingHand(player, seed) {

  let shuffled = ss.shuffle(cards, seed, true)
  let hand = []
  if (player === 0) {
    // parent
    hand = hand.concat(shuffled.slice(0, 4))
    hand = hand.concat(shuffled.slice(8, 12))
    hand = hand.concat(shuffled.slice(16, 20))
    hand.push(shuffled[24])
  } else {
    // child 
    hand = hand.concat(shuffled.slice(4, 8))
    hand = hand.concat(shuffled.slice(12, 16))
    hand = hand.concat(shuffled.slice(20, 24))
    hand.push(shuffled[25])
  }
  return hand
}

exports.getStartingHand = getStartingHand
