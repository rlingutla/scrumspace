'use-strict';
var database = require('../database');

var express = require('express'),
	router = express.Router();

import authentication from './shared/authentication';

module.exports = function (io) {
	router.get('/', function (req, res) {
	    res.send('Welcome to the ScrumSpace API V1');
	});

	// authenticate all routes
	router.use(authentication);


	// data routes
	router.use('/project/', require('./project')(io));
	router.use('/user/', require('./user')(io));
	router.use('/init/', require('./init')(io));

	// Reset database.
	router.post('/resetdb', function(req, res) {
		console.log('Resetting database...');
		// This is a debug route, so don't do any validation.
		database.resetDatabase();
		// res.send() sends an empty response with status code 200
		io.emit('DATABASE_RESET', {});
		res.send();
	});

	return router;
};
