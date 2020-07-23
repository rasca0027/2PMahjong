const ss = require('seededshuffle')


const cards = [
  '1.s', '2.s', '3.s', '4.s', '5.s', '6.s', '7.s', '8.s', '9.s',
  '1.s', '2.s', '3.s', '4.s', '5.s', '6.s', '7.s', '8.s', '9.s',
  '1.s', '2.s', '3.s', '4.s', '5.s', '6.s', '7.s', '8.s', '9.s',
  '1.s', '2.s', '3.s', '4.s', '5.s', '6.s', '7.s', '8.s', '9.s',
  '1.p', '2.p', '3.p', '4.p', '5.p', '6.p', '7.p', '8.p', '9.p',
  '1.p', '2.p', '3.p', '4.p', '5.p', '6.p', '7.p', '8.p', '9.p',
  '1.p', '2.p', '3.p', '4.p', '5.p', '6.p', '7.p', '8.p', '9.p',
  '1.p', '2.p', '3.p', '4.p', '5.p', '6.p', '7.p', '8.p', '9.p',
  '1.m', '2.m', '3.m', '4.m', '5.m', '6.m', '7.m', '8.m', '9.m',
  '1.m', '2.m', '3.m', '4.m', '5.m', '6.m', '7.m', '8.m', '9.m',
  '1.m', '2.m', '3.m', '4.m', '5.m', '6.m', '7.m', '8.m', '9.m',
  '1.m', '2.m', '3.m', '4.m', '5.m', '6.m', '7.m', '8.m', '9.m',
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
