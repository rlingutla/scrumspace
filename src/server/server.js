var express = require('express'),
app = express(),
server = require('http').createServer(app);
//var database = require('./database');
var io = require('socket.io')(server);
require('babel-core/register');

//connect to mongo if necessary
var mongo_express = require('mongo-express/lib/middleware');
//Import the default Mongo Express configuration
var mongo_express_config = require('mongo-express/config.default.js');
var MongoDB = require('mongodb');
var MongoClient = MongoDB.MongoClient;
var ObjectID = MongoDB.ObjectID;
var url = 'mongodb://localhost:27017/scrumspace';


//sockets
io.on('connection', function (socket) {
	socket.emit('welcome', { hello: 'world' });
});

MongoClient.connect(url, function(err, db) {
	if (err) {
		logger('Could not connect to database!');
		logger('Error: ' + err.message);
		logger('Server process did not launch');
	} else {
		logger('Server successfully connected to database!');
		// configure express app
		require('./config').config(app, io, db);

		// listen on designated port
		server.listen(app.get('port'), () => {
			logger('Listening on port ' + app.get('port'));
		});
	}
});


