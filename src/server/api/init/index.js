'use-strict';
//Database Functions
var database = require('../../database');
var readDocument = database.readDocument;

var express = require('express'),
	router = express.Router();

var StandardError = require('../shared/StandardError');
var search = require('../shared/search');
var embedUsers = require('../shared/embedUsers');

module.exports = function (io) {

	router.get('/', function (req, res) {
		var userId = 0;
		var users = readDocument('users');

		var projects = readDocument('projects');
		var populatedProjects = projects.map((project) => {
			return embedUsers(project);
		}); 

		var user = users[userId];
		var stateTree = {
			user: {
					'_id': user._id,
					'first_name': user.first_name,
					'last_name': user.last_name,
					'email': user.email,
					'display_name': user.display_name,
					'avatar_url': user.avatar_url
			},
			projects: populatedProjects
		};
		res.send(stateTree);
	});

	return router;
}
