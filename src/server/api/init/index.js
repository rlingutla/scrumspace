'use-strict';
//Database Functions
var database = require('../../database');
var readDocument = database.readDocument;

var express = require('express'),
	router = express.Router();

var StandardError = require('../shared/StandardError');
var search = require('../shared/search');

router.get('/', function (req, res) {
	var userId = 0;
	var userObj = readDocument('users', userId);
	var projects = readDocument('projects');
	delete userObj.password; // TODO: this is bad design
	var stateTree = {
		user: userObj[userId],
		projects
	};
	res.send(stateTree);
});


module.exports = router;