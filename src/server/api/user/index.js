'use-strict';
import UserSchema from '../../schemas/user';
var validate = require('express-jsonschema').validate;

var database = require('../../database');
var readDocument = database.readDocument;
var writeDocument = database.writeDocument;
var getCollection = database.writeDocument;

var authentication = require('../shared/authentication');
var getUserIdFromToken = authentication.getUserIdFromToken;
var checkAuthFromProject = authentication.checkAuthFromProject;

var ObjectID = require('mongodb').ObjectID;

var express = require('express'),
	router = express.Router();

var StandardError = require('../shared/StandardError');
var search = require('../shared/search');

module.exports = function (io, db) {

	router.get('/search', function(req, res) {
		search(db, req.query.searchStr || '', 'users', req.query.key || '_id').then(
			(results) => res.send(results),
			(error) => res.status(error.status).send(error)
		);
	});

	router.get('/:id', function(req, res) {
		db.collection("users").findOne({ _id: new ObjectID(req.params.id) }, { password: 0 }, (err, user) => {
			if(err) return res.status(500).send(err);
			else return res.send(user);
		});
	});

	// needs client side
	// Supriya's code

	// TODO ONLY GRAB THE USER FROM THE TOKEN!!
	router.put('/', validate({ body: UserSchema }), function(req, res) {
		// first get all the inputs based on the user id given
		// gets users id from user
		var userId = parseInt(req.params.user_id, 10);
		// // gets users, and reads it
		var users = readDocument('users');

		//check passwords
		if (typeof req.body.old_password !== 'undefined') {
			if (req.body.old_password === users[userId].password) {
				users[userId].password = req.body.new_password;
			}
			//  Unauthorized
			else res.status(401).end();
		}

		if (typeof req.body.first_name !== 'undefined') users[userId].first_name = req.body.first_name;
		if (typeof req.body.avatar_url !== 'undefined') users[userId].avatar_url = req.body.avatar_url;
		if (typeof req.body.first_name !== 'undefined') users[userId].first_name = req.body.first_name;
		if (typeof req.body.last_name !== 'undefined') users[userId].last_name = req.body.last_name;
		if (typeof req.body.display_name !== 'undefined') users[userId].display_name = req.body.display_name;
		if (typeof req.body.email !== 'undefined') users[userId].email = req.body.email;

		//writeDocument('users', users[userId]);
		res.send(users[userId]);
	});

	return router;
};