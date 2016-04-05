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
	var users = readDocument('users');

	var projects = readDocument('projects');
	var populatedProjects = projects.map((project) => {
		return Object.assign({}, 
			project, 
			{
				//map userIDs to user objects
				users: project.users.map((id) => {
					var obj = {
						'_id': users[id]._id,
						'first_name': users[id].first_name,
						'last_name': users[id].last_name,
						'email': users[id].email,
						'display_name': users[id].display_name,
						'avatar_url': users[id].avatar_url
					}
					return obj;
				})
			}
		);
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


module.exports = router;