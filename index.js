var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const routes = require('./routes.js')
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


io.on('connection', (socket) => {
  console.log(`a user ${socket.id} is connected`)
  socket.on('disconnect', (reason) => {
        console.log(reason)
  });
  socket.on('join', (reason) => {
        console.log(reason)
  });
})

app.use('/', routes)

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true } , (err) => {
  console.log('mongodb connected', err);
})

var server = http.listen(3001, () => {
  console.log('server is running on port', server.address().port);
});
