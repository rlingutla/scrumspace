'use-strict';

var express = require('express'),
	router = express.Router(),
	expJWT = require('express-jwt'),
	jwt = require('jsonwebtoken'),
	moment = require('moment');

import { getUser } from './api/shared/authentication';

module.exports = function (secret) {
	router.get('/', function(req, res){
		res.sendFile(__dirname + '/views/login.html');
	});

	router.post('/', function(req, res){
		var body = req.body;
		// console.log("body", body);
		if(body.email && body.password){
			var user = getUser(body.email, body.password);
			// console.log("user from POST", user);

			if(user !== null){
				var expiration = moment().add('days', 1).valueOf();
				// var token = jwt.encode({ iss: user._id, exp: expiration },  secret);	

				var token = jwt.sign({ _id: user._id, exp: expiration }, secret, { expiresIn: expiration });

				//send the token back
				res.json({
					token : token,
					expires : expiration,
					user : { email: user.email }
				});
			} else res.sendStatus(401);

		} else res.sendStatus(401); 
	});

	return router;
};


