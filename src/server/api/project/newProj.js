
function newProjCreation(title, description, users,membersOnProj) {
	/*
	// var projects = readDocument('projects');
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
	// writeDocument('projects', project);
	return project;
	*/
}
module.exports.newProjCreation = newProjCreation;

function projUpdate(project_id, title, users) {
	/*
	// var projects = readDocument('projects');
	var project_i = getProjectIndex(project_id);
	if (project_i === 'PROJECT_NOT_FOUND')
		return 'PROJECT_NOT_FOUND';
	projects[project_i].title = title;
	projects[project_i].users = users || projects[project_i].users;

	/// writeDocument('projects', projects[project_i]);
	console.log('DB Updated', projects[project_i]);
	return projects[project_i];
	*/
}
module.exports.projUpdate = projUpdate;

function projRemoval(project_id) {
	/*
	var projects = readDocument('projects');
	var project_i = getProjectIndex(project_id);
	if(project_i === 'PROJECT_NOT_FOUND')
		return 'PROJECT_NOT_FOUND';
	var removed = projects.splice(project_i,1);
	overwriteCollection('projects', projects);
	console.log('DB Updated', readDocument('projects'));
	return removed[0];
	*/
}
module.exports.projRemoval = projRemoval;
