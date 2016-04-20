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
	router.put('/', validate({ body: UserSchema }), function(req, res) {
		let updObj = {};
		if (typeof req.body.first_name !== 'undefined') updObj.first_name = req.body.first_name;
		if (typeof req.body.avatar_url !== 'undefined') updObj.avatar_url = req.body.avatar_url;
		if (typeof req.body.first_name !== 'undefined') updObj.first_name = req.body.first_name;
		if (typeof req.body.last_name !== 'undefined') updObj.last_name = req.body.last_name;
		if (typeof req.body.display_name !== 'undefined') updObj.display_name = req.body.display_name;
		if (typeof req.body.email !== 'undefined') updObj.email = req.body.email;

		db.collection('users').findOne({'_id': new ObjectID(req.user_id)}, (err, user) => {
			if(err) return res.status(500).send(err);
			else {
				// we can assume user exists, it's already passed through auth
				if(req.body.old_password){
					if(req.body.old_password !== user.password) return res.status(400).send({error: 'Incorrect Old Password'});
					updObj.password = req.body.new_password;
				}

				db.collection('users').updateOne({'_id': new ObjectID(req.user_id)}, { $set: updObj }, (err) => {
					if (err) return res.status(500).send(err);
					else {
						let retUser = Object.assign({}, user, updObj);
						delete retUser.password;
						return res.send({ data: retUser });
					}
				});
			}
		});
	});

	return router;
};