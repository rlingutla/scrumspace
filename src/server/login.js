'use-strict';

var express = require('express'),
	router = express.Router(),
	expJWT = require('express-jwt'),
	jwt = require('jsonwebtoken'),
	moment = require('moment');

import { getUserByCreds } from './api/shared/authentication';

module.exports = function (secret, db) {
	router.get('/', function(req, res){
		res.sendFile(__dirname + '/views/login.html');
	});

	router.post('/', function(req, res){
		var body = req.body;
		// console.log("body", body);
		if(body.email && body.password){
			getUserByCreds(body.email, body.password, db).then((user) => {
				var expiration = moment().add('days', 1).valueOf();
				// var token = jwt.encode({ iss: user._id, exp: expiration },  secret);	

				var token = jwt.sign({ _id: user._id, exp: expiration }, secret, { expiresIn: expiration });

				//send the token back
				res.json({
					token : token,
					expires : expiration,
					user : { email: user.email }
				});
			},
			(err) => res.sendStatus(401));
		}
	});

	return router;
};


