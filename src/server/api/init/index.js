'use-strict';
var express = require('express'),
	router = express.Router();

var StandardError = require('../shared/StandardError');
var search = require('../shared/search');
import { embedUsers, packageProjects } from '../shared/projectUtils';

import { getUserById, getUserIdFromToken } from '../shared/authentication';

module.exports = function (io, db) {

	router.get('/:user_id', function (req, res) {
		// extract user ID from auth token
		getUserIdFromToken(req.get('Authorization'), (user_id) => {
			// get user object from param ID
			getUserById(req.params.user_id, db).then(
				(user) => {
					//check if auth user === user in param
					if(req.params.user_id === user_id){
						packageProjects(user_id, db).then(
							(packagedProjects) => {
								var stateTree = {
									user: {
											'_id': user._id,
											'first_name': user.first_name,
											'last_name': user.last_name,
											'email': user.email,
											'display_name': user.display_name,
											'avatar_url': user.avatar_url
									},
									projects: packagedProjects
								};

								res.send(stateTree);
							},
							(error) => res.status(500).send(error)
						);
					} else res.sendStatus(401);
				},
				(err) => {
					console.log('err', err);
					if(err) res.sendStatus(500); //database error
					else res.sendStatus(400); //user not found
				}
			);
		});
	});

	return router;
};