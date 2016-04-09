var database = require('../../database');
var readDocument = database.readDocument;
var writeDocument = database.writeDocument;
var util = require('./util');
var getProjectIndex = util.getProjectIndex;
var getSprintIndex = util.getSprintIndex;

function sprintMaker(project, name, duration, time, sprint){
	//sprint is not passed through if it is a new sprint hence the type is undefined
	var projects = readDocument('projects');
	//The following is to get the value of the project and sprint to be added or edited.
	var project_i = getProjectIndex(project);
	var sprint_id, start_date;
	var sprint_i = (typeof sprint !== 'undefined') ? getSprintIndex(project_i, sprint): null;
	if(sprint_i !== 'SPRINT_NOT_FOUND' && sprint_i !== null){ //sprint_i is a number
		sprint_id = projects[project_i].sprints[sprint_i]._id;
		start_date = projects[project_i].sprints[sprint_i].start_date;
	}
	else if(sprint_i === 'SPRINT_NOT_FOUND'){
		return 'SPRINT_NOT_FOUND';
	}
	else{ //sprint is undefined
		sprint_i = projects[project_i].sprints.length;
		//the below line will be a lot less ugly with UUIDs
		sprint_id = (projects[project_i].sprints.length > 0)? projects[project_i].sprints[sprint_i -1]._id + 1 : 0;
		start_date = null;
	}
	////////////////////////////////////////////////////
	let newSprint ={
		'_id': sprint_id,
		'name': name,
		'start_date': start_date,
		'duration': duration,
		'scrum_time': time
	};
	projects[project_i].sprints[sprint_i] = newSprint;
	writeDocument('projects', projects[project_i]);
	console.log('DB Updated', projects[project_i]);
	return newSprint;
}
module.exports.sprintMaker = sprintMaker;

function removeSprint(project, sprint){
	var projects = readDocument('projects');
	//The following is to get the value of the project and sprint to be added or edited.
	var project_i = getProjectIndex(project);
	//possible errors
	if(projects[project_i].current_sprint === sprint)
		return 'CURRENT_SPRINT_ERROR';
	var sprint_i = getSprintIndex(project_i, sprint);
	if(sprint_i === 'SPRINT_NOT_FOUND')
		return 'SPRINT_NOT_FOUND';
	//set stories of to null to move them to the backlog
	for(let i in projects[project_i].stories){
		if(projects[project_i].stories[i].sprint_id === sprint)
			projects[project_i].stories[i].sprint_id = null;
	}
	////////////////////////////////////////////////////
	var removedSprint = projects[project_i].sprints.splice(sprint_i, 1);
	writeDocument('projects', projects[project_i]);
	console.log('DB Updated', projects[project_i]);
	return projects[project_i];
}
module.exports.removeSprint = removeSprint;
