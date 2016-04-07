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
// // get first name
// var firstName = users[userId].first_name;
// // get last name
// var lastName  = users[userId].last_name;
// // get display name
// var displayName = users[userId].display_name;
// // get email
// var email = users[userId].email;

console.log(users[userId].first_name);
console.log(users[userId].last_name);
console.log( users[userId].display_name);
console.log(users[userId].email);

if(typeof req.body.first_name!=='undefined') users[userId].first_name = req.body.first_name;
if(typeof req.body.last_name!=='undefined') users[userId].last_name = req.body.last_name;
if(typeof req.body.display_name!=='undefined') users[userId].display_name = req.body.display_name;
if(typeof req.body.email!=='undefined') users[userId].email= req.body.email;

console.log(users[userId].first_name);
console.log(users[userId].last_name);
console.log( users[userId].display_name);
console.log(users[userId].email);


 res.send(users[userId].first_name  +  users[userId].last_name + users[userId].display_name + users[userId].email);


// // prints 0  console.log(userId);
// // prints all of the user contents console.log(users);
// console.log(firstName);
// console.log(lastName);
// console.log(displayName);
// console.log(email);


// this prints what is in the entire console body console.log(req.body);

//console.log(req.body);
// console.log(bfirstName);
// console.log(req.body.email);
// console.log(req.body.display_name);




// for ( let i = 0; i < users.length; i++){
// 	console.log(users[i]);
// }



	 //needs authorization, please see
	// request the user 0

	// console.log(userId);
	// var users = getCollection('users');
	// var user_i;
	//
	// for(let i = 0; i<users.length; i++){
	// 	console.log(users[i]);
	// }


  // 	for (let i = 0; i < users.length; i++){
	// 		  if(users[i]._id === userId){
	// 				user_i = i;
  //         console.log(i);
	// 			}
	// 	}
	//
	//
	// console.log('userId:'+users[user_i]._id);
	// console.log('user' + users[user_i]);
	// console.log('user first name' + users[user_i].first_name);
	// console.log('user id first  name' + userId.first_name);



	// //console.log(req.body);
	// //console.log(user);
	// if(typeof req.body.first_name!=='undefined')
	// { //console.log('true');
	// user.first_name = req.body.first_name;}
	//
	// if(typeof req.body.last_name!=='undefined') user.last_name = req.body.last_name;
	// if(typeof req.body.display_name!=='undefined') user.display_name = req.body.display_name;
	// if(typeof req.body.email!=='undefined') user.email = req.body.email;
	//
	// writeDocument('users', user);
	// res.send(user);
});

// router.put('/:settings/users/:user_id/password', function(req, res) {
// 	//use authorization
// 	let userId = parseInt(getUserIdFromToken(req.get('Authorization')));
// //	userId=0;
// 	var user = readDocument('users',userId);
// 	// change if
// 	if(user.password === req.body.old_password){
// 		user.password = req.body.new_password;
// 	}
// 	//console.log(req.body);
// 	//console.log(user);
// 	writeDocument('users', user);
// 	//console.log(user);
// 	res.send(user);
// });

module.exports = router;
