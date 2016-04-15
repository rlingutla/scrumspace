/*
	This function will authenticate all routes in the application
*/
import _ from 'underscore';
//import jwt from 'jwt-simple';
var jwt = require('jsonwebtoken');

var secret = require('../../config').secret;

// Database functions
var database = require('../../database');
var readDocument = database.readDocument;

/*
	Get the user ID from a token. Returns -1 (an invalid ID) if it fails.
*/

export function getUserIdFromToken(authorizationLine, cb) {
	jwt.verify(authorizationLine.slice(7), "howMuchWoodCouldAWoodchuckChuckIfAWoodchuckCouldChuckWood", (err, decodedToken) => {
		if(err) return cb(-1);
		else return cb(decodedToken._id);
	});
}

function isUserMemberOfProject(user_id, project_id){
	// allow string parameters
	user_id = parseInt(user_id, 10);
	project_id = parseInt(project_id, 10);

	var project = readDocument('projects').find((e) => {
		return e._id === project_id;
	});

	if (typeof project !== 'undefined') {
		return _.contains(project.users, user_id);
	} else {
		console.log('Project not found');
		return false;
	}
}

export function getUser(email, password){
	var users = readDocument('users');

	var user = {};
	for(let userIndex in users){
		if(users[userIndex].email === email) user = users[userIndex];
	}

	return (user.password === password) ? user:null;
}

function isUserValid(user_id) {
	if (user_id < 0) return false;	
	// check if user is in our database
	var foundUser = readDocument('users', user_id); // todo, this will be a database call.(removing line above too)
	return foundUser._id === user_id;
}

export const loginAuth = (req, res, next) => {
	getUserIdFromToken(req.get('Authorization'), (user_id) => {
		var requestUrl = req._parsedUrl.path;

		if(!isUserValid(user_id)){
			console.log(`Unauthorized user (${user_id}) request denied`);
			return res.redirect('/login');
			// return res.status(401).end();
		}

		// valid user, continue
		else return next();
	});
};

/*
export default (req, res, next) => {
	var user_id = getUserIdFromToken(req.get('Authorization'));
	var requestUrl = req._parsedUrl.path;

	if(!isUserValid(user_id)){
		console.log(`Unauthorized user (${user_id}) request denied`);
		// return res.redirect('/login');
		return res.status(401).end();
	}


	if (requestUrl.indexOf('/init') === 0 || requestUrl.indexOf('/user') === 0 || requestUrl === '/project/' ) {
		if (!isUserValid(user_id)) {
			console.log(`Unauthorized user (${user_id}) request denied`);
			// return res.redirect('/login');
			return res.status(401).end();
		}
		console.log(`Authorized user (${user_id}) request granted`);
		return next();
	} 

	//  looks like: /project/project_id/....
	if (requestUrl.indexOf('/project/') === 0) {
		var project_id = parseInt(requestUrl.split('/')[2], 10);
		if (!isUserMemberOfProject(user_id, project_id)) {
			console.log(`Unauthorized user (${user_id}) tried to access project ${project_id}`);
			res.status(401).end();
		} 
		console.log(`Authorized user (${user_id}) accessed project ${project_id}`);
		return next();	
	}

	if (requestUrl.indexOf('/resetdb') === 0) {
		return next();
	} 

	console.log(`Route ${requestUrl} currently is not set for authentication`);
	res.status(404).end();
};*/