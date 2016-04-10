/*
	This function will authenticate all routes in the application
*/
import _ from 'underscore';

// Database functions
var database = require('../../database');
var readDocument = database.readDocument;

/*
	Get the user ID from a token. Returns -1 (an invalid ID) if it fails.
*/

export function getUserIdFromToken(authorizationLine) {
	try {
		var token = authorizationLine.slice(7); // Cut off "Bearer " from the header value.
		// Convert the base64 string to a UTF-8 string.
		var regularString = new Buffer(token, 'base64').toString('utf8'); //buffer is a node thing
		// Convert the UTF-8 string into a JavaScript object.
		var tokenObj = JSON.parse(regularString);
		var id = tokenObj['_id']; //because we use _id instead of just id
		
		return (typeof id === 'number') ? id : -1;
	} catch (e) {
		return -1; // Return an invalid ID.
	}
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

function isUserValid(user_id) {
	if (user_id < 0) return false;	
	// check if user is in our database
	var foundUser = readDocument('users', user_id); // todo, this will be a database call.(removing line above too)
	return foundUser._id === user_id;
}

export default (req, res, next) => {
	var user_id = getUserIdFromToken(req.get('Authorization'));
	var requestUrl = req._parsedUrl.path;

	if (requestUrl.indexOf('/init') === 0 || requestUrl.indexOf('/user') === 0 || requestUrl === '/project/' ) {
		if (!isUserValid(user_id)) {
			console.log(`Unauthorized user (${user_id}) request denied`);
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
};