var database = require('../../database');
var readDocument = database.readDocument;
var writeDocument = database.writeDocument;
var deleteDocument = database.deleteDocument;

function newProjCreation(title, description, users, status, current_sprint, avatar, sprints,
	stories, commits, timeFrame, membersOnProj, gCommits, color) {
	// read in all projects, access last project in the array, get it's ID and increment that value
	var projects = readDocument('projects');
	var prevId = projects[projects.length - 1]._id;

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
		'membersOnProj': membersOnProj,
		'gCommits': [10 + Math.floor(Math.random() * 10), 6 + Math.floor(Math.random() * 10), 4 + Math.floor(Math.random() * 10), 8 + Math.floor(Math.random() * 10), 5 + Math.floor(Math.random() * 10), 7 + Math.floor(Math.random() * 10), 7 + Math.floor(Math.random() * 10)],
		'color': '#' + Math.floor(Math.random() * 16777215).toString(16)
	};
	writeDocument('projects', project);

	return project;
}
module.exports.newProjCreation = newProjCreation;

function projUpdate(project_id, title, users) {
	//sprint is not passed through if it is a new sprint hence the type is undefined
	var projects = readDocument('projects');
	//The following is to get the value of the project and sprint to be added or edited.
	var project_i;
	console.log(project_id, title, users);
	for (let i = 0; i < projects.length; i++) {
		if (projects[i]._id === project_id) {
			console.log("yo");
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
	//sprint is not passed through if it is a new sprint hence the type is undefined
	var projects = readDocument('projects');
	//The following is to get the value of the project and sprint to be added or edited.
	var project_i;
	console.log(project_id);
	for (let i = 0; i < projects.length; i++) {
		if (projects[i]._id === project_id) {
			project_i = i;
			break;
		}
	}
  deleteDocument('projects', project_i);
	//projects.splice(project_i,1);
	return projects;
}
module.exports.projRemoval = projRemoval;
