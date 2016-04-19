/*
	This function will authenticate all routes in the application
*/
import _ from 'underscore';
//import jwt from 'jwt-simple';
var jwt = require('jsonwebtoken');

var secret = require('../../config').secret;

// Database functions
//deprecated
var database = require('../../database');
var readDocument = database.readDocument;

var ObjectID = require('mongodb').ObjectID;
// var objIDValidate = require('mongodb').BSONPure.ObjectID;

/*
	Get the user ID from a token. Returns -1 (an invalid ID) if it fails.
*/

export function getUserIdFromToken(authorizationLine, cb) {
	if(authorizationLine){
		// TODO: grab secret from file
		jwt.verify(authorizationLine.slice(7), "howMuchWoodCouldAWoodchuckChuckIfAWoodchuckCouldChuckWood", (err, decodedToken) => {
			if(err) return cb(-1);
			else return cb(decodedToken._id);
		});
	} else return cb(-1);

}

function isUserMemberOfProject(user_id, project_id, db){
	return new Promise((resolve, reject) => {
		// get the project from URL param
		db.collection('projects').findOne({ '_id': new ObjectID(project_id) }, (err, project) => {
			if(err) return reject(false);
			else {
				//if no project
				if(project === null) return reject(false);

				// look for user in project.users
				let isMember = project.users.find((user) => user.toString() === user_id);
				(isMember) ? resolve(true):reject(false);
			}
		});
	});
}

export function getUserById(id, db){
	return new Promise((resolve, reject) => {
		db.collection('users').findOne({_id: new ObjectID(id)}).then((user) => {
			if(user) resolve(user);
			else reject(null);
		},
		(err) => {
			logger(`Database Error: ${err}`);
			reject(false);
		});
	});
}

export function getUserByCreds(email, password, db){
	return new Promise((resolve, reject) => {
		db.collection('users').findOne({email:email}).then((user) => {
			//TODO do crypto check
			if(user.password === password) resolve(user);
			else reject(null);
		},
		(err) => {
			logger("Database Error:", err);
			reject(null);
		});
	});
}

function isUserValid(user_id, db) {
	return new Promise((resolve, reject) => {
		if(user_id < 0) reject(false);

		db.collection('users').findOne({_id:ObjectID("000000000000000000000000")}).then((doc) => {
			if(doc !== null) resolve(true);
			else reject(false);
		},
		(err) => {
			logger("Database Error:", err);
			reject(false);
		});
	});
}

export const loginAuth = (db) => {
	return (req, res, next) => {
		getUserIdFromToken(req.get('Authorization'), (user_id) => {
			var requestUrl = req._parsedUrl.path;

			isUserValid(user_id, db).then(
				(valid) => {
					//pass user_id to next middleware
					req.user_id = user_id;
					return next();
				},
				(invalid) => {
					logger(`Unauthorized user (${user_id}) request denied`);
					return res.status(401).end();
				}
			);
		});
	};
};


export default (db) => {
	return (req, res, next) => {
		
		let requestUrl = req._parsedUrl.path;
		let project_id = requestUrl.split('/')[2];
		// if a project route
		if(ObjectID.isValid(project_id)){
			// check if user from token is member of the specfd project
			isUserMemberOfProject(req.user_id, project_id, db).then(
				(isMember) => next(),
				(notMember) => res.sendStatus(401)
			);
		} else next();
	};
};
