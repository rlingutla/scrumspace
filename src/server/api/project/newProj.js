var database = require('../../database');
var readDocument = database.readDocument;
var writeDocument = database.writeDocument;
var deleteDocument = database.deleteDocument;
var overwriteCollection = database.overwriteCollection;


function newProjCreation(title, description, users,membersOnProj) {
	var projects = readDocument('projects');
	// var userNames = readDocument('users');
	// var user_i;
	// var userFNames : [];
	// for (let i = 0; i < users.length; i++) {
	// 	userFNames[i] === userNames.first_name;
	// }
	//
	// this.userIds = [];
	// usersIds: this.userNames.map((member) => member._id);

	var prevId = projects[projects.length-1]._id;
	let project = {
		'_id': prevId + 1,
		'title': title,
		'description': description,
		'users': users,
		'status': 'planning',
		'current_sprint': null,
		'avatar': '',
		'sprints': [],
		'stories': [],
		'commits': [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)],
		'timeFrame': ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri'],
		'membersOnProj':  membersOnProj,
		'gCommits': [10 + Math.floor(Math.random() * 10), 6 + Math.floor(Math.random() * 10), 4 + Math.floor(Math.random() * 10), 8 + Math.floor(Math.random() * 10), 5 + Math.floor(Math.random() * 10), 7 + Math.floor(Math.random() * 10), 7 + Math.floor(Math.random() * 10)],
		'color': '#' + Math.floor(Math.random() * 16777215).toString(16)
	};
	console.log('DB Updated', project);
	writeDocument('projects', project);
	return project;
}
module.exports.newProjCreation = newProjCreation;

function projUpdate(project_id, title, users) {
	var projects = readDocument('projects');
	var project_i;
	console.log(project_id, title, users);
	for (let i = 0; i < projects.length; i++) {
		if (projects[i]._id === project_id) {
			project_i = i;
			break;
		}
	}
	projects[project_i].title = title;
	projects[project_i].users = users || projects[project_i].users;

	writeDocument('projects', projects[project_i]);
	console.log('DB Updated', projects[project_i]);
	return projects[project_i];
}
module.exports.projUpdate = projUpdate;

function projRemoval(project_id) {
	var projects = readDocument('projects');
	var project_i;
	for (let i = 0; i < projects.length; i++) {
		if (projects[i]._id === project_id) {
			project_i = i;
			break;
		}
	}

	var removed = projects.splice(project_i,1);
	overwriteCollection('projects', projects);
	console.log('DB Updated', readDocument('projects'));
	return removed;
}
module.exports.projRemoval = projRemoval;
