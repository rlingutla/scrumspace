'use-strict';
var UserSchema = require('../../schemas/user');
var validate = require('express-jsonschema').validate;

var database = require('../../database');
var readDocument = database.readDocument;
var writeDocument = database.writeDocument;
var getCollection = database.writeDocument;

var authentication = require('../shared/authentication');
var getUserIdFromToken = authentication.getUserIdFromToken;
var checkAuthFromProject = authentication.checkAuthFromProject;

var express = require('express'),
	router = express.Router();

var StandardError = require('../shared/StandardError');
var search = require('../shared/search');

router.get('/', function (req, res) {
    res.send('user API handler');
});

router.get('/search', function(req,res){
	var searchResults = search(req.query.searchStr || '', 'users', req.query.key || null);
	if(searchResults.data){
		searchResults.data = searchResults.data.map((user) => {
			return {
				'_id': user._id,
				'first_name': user.first_name,
				'last_name': user.last_name,
				'email': user.email,
				'display_name': user.display_name,
				'avatar_url': user.avatar_url
			};
		});
	}
	return res.send(searchResults);
});

router.get('/:id', function(req,res){
	res.send({
		'_id': req.params.id,
		'name': 'dylan'
	});
});

// why is user id -1?
// why is returning undefined
// why is returing 404 when route is /settings/users/user_id
// client side

router.put('/:user_id',  function(req, res) {
// // first get all the inputs based on the user id given
// // gets users id from user
 var userId = parseInt(req.params.user_id,10);
// // gets users, and reads it
var users =  readDocument ('users');

console.log(users[userId].first_name);
console.log(users[userId].last_name);
console.log( users[userId].display_name);
console.log(users[userId].email);
console.log(users[userId].avatar_url);
console.log(users[userId].password);

/// see this **
if(typeof req.body.password!=='undefined'){
	if(req.body.password === users[userId].password){
		users[userId].password  = req.body.password;
	}
}

if(typeof req.body.first_name!=='undefined') users[userId].first_name = req.body.first_name;
if(typeof req.body.avatar_url!=='undefined') users[userId].avatar_url = req.body.avatar_url;
if(typeof req.body.first_name!=='undefined') users[userId].first_name = req.body.first_name;
if(typeof req.body.last_name!=='undefined') users[userId].last_name = req.body.last_name;
if(typeof req.body.display_name!=='undefined') users[userId].display_name = req.body.display_name;
if(typeof req.body.email!=='undefined') users[userId].email= req.body.email;







console.log(users[userId].first_name);
console.log(users[userId].last_name);
console.log( users[userId].display_name);
console.log(users[userId].email);
console.log(users[userId].avatar_url);
console.log(users[userId].password);


 res.send(users[userId]);

});



module.exports = router;
