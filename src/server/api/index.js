'use-strict';
var database = require('../database');
var MongoDB = require('mongodb');
var MongoClient = MongoDB.MongoClient;
var ObjectID = MongoDB.ObjectID;
var url = 'mongodb://localhost:27017/scrumspace';
var ResetDatabase = require('../resetdatabase');
// var mongo_express = require('mongo-express/lib/middleware');
// //Import the default Mongo Express configuration
// var mongo_express_config = require('mongo-express/config.default.js');

var express = require('express'),
	router = express.Router();

import projectAuth from './shared/authentication';

module.exports = function (io, db) {
	router.get('/', function (req, res) {
	    res.send('Welcome to the ScrumSpace API V1');
	});

	// // authenticate all routes
	// router.use(authenticate);

//MongoClient.connect(url, function(err, db){
	// data routes
	router.use('/project/', [projectAuth(db), require('./project')(io, db)]);
	router.use('/user/', require('./user')(io, db));
	router.use('/init/', require('./init')(io, db));

	// Reset database.
	// router.post('/resetdb', function(req, res) {
	// 	console.log('Resetting database...');
	// 	// This is a debug route, so don't do any validation.
	// 	ResetDatabase();
	// 	// res.send() sends an empty response with status code 200
	// 	io.emit('DATABASE_RESET', {});
	// 	res.send();
	// });

	// Reset the database.
router.post('/resetdb', function(req, res) {
  console.log("Resetting database...");
  ResetDatabase(db, function() {
		io.emit('DATABASE_RESET', {});
    res.send();
  });
});


	return router;
//});
};
