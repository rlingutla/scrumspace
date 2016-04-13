'use-strict';

var express = require('express'),
	router = express.Router(),
	jwt = require('jwt-simple'),
	moment = require('moment')

module.exports = function (secret) {
	router.get('/', function(req, res){
		res.sendFile(__dirname + '/views/login.html');
	});

	router.post('/', function(req, res){
		if(req.body.username && req.body.password){
			if(req.body.username === 'cookie' && req.body.password === 'monster'){
				var expiration = moment().add('days', 1).valueOf();
				var token = jwt.encode({ iss: req.body.username, exp: expiration },  secret);	
				//send the token back
				res.json({
					token : token,
					expires : expiration,
					user : {username: req.body.username}
				});
			} else res.sendStatus(401);
		} else res.sendStatus(401); 
	});

	return router;
};


