var express = require('express'),
app = express(),
server = require('http').createServer(app);


var database = require('./database');

var io = require('socket.io')(server);

//sockets
io.on('connection', function (socket) {
	socket.emit('welcome', { hello: 'world' });
});

require('babel-core/register');

// configure express app
require('./config').config(app, io);

// listen on designated port
server.listen(app.get('port'), () => {
	console.log('Listening on port ' + app.get('port'));
});
