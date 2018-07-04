var http = require('http');
var express = require('express');
var app = express();
var axios = require('axios');
var jwt = require('jsonwebtoken');
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var functions = require('./functions.js');
// calculateur Lilian init
const LILapi = require('./calc/LILapi.js');
var TT = new LILapi();


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Listening on ${ PORT }`));
io.use(function(socket, next) {
   if (socket.handshake.query && socket.handshake.query.token) {
      jwt.verify(socket.handshake.query.token, 'shhhhh', function(err, decoded) {
         if (err) return next(new Error('Authentication error'));
         socket.decoded = decoded;
         next();
      });
   } else {
      next(new Error('Authentication error'));
   }
}).on('connection', function(socket) {
   console.log("Connected succesfully to the socket ..." + JSON.stringify(socket.handshake.query));
   if (socket.handshake.query.route == 'now') {
      setInterval(() => {
         socket.emit('now', functions.generate_datas_instant(socket.handshake.query.ville));
      }, 1000);
   } else if (socket.handshake.query.route == 'today') {
      setInterval(() => {
         socket.emit('today', functions.generate_datas_today(socket.handshake.query.ville));
      }, 1000);
   } else if (socket.handshake.query.route == 'day') {
      socket.emit('day', functions.generate_datas_day(socket.handshake.query.date, socket.handshake.query.ville));
   } else if (socket.handshake.query.route == 'last24') {
      socket.emit('last24', functions.generate_last24(socket.handshake.query.ville));
   } else if (socket.handshake.query.route == 'year') {
      socket.emit('year', functions.generate_datas_year(socket.handshake.query.ville));
   }
   socket.on('disconnect', function() {
      console.log('Got disconnect!');
   });
});
