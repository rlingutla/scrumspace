var database = require('../../database');
var readDocument = database.readDocument;
var writeDocument = database.writeDocument;

function sprintMaker(project, name, duration, time, sprint){
	//sprint is not passed through if it is a new sprint hence the type is undefined
	var projects = readDocument('projects');
	//The following is to get the value of the project and sprint to be added or edited.
	var project_i = null, sprint_i = null, start_date;
	for(let i = 0; i < projects.length; i++){
		if (projects[i]._id === project) {
			project_i = i;
			for(let j = 0; j < projects[i].sprints.length && typeof sprint !== 'undefined'; j++){
				if(projects[i].sprints[j]._id === sprint){
					sprint_i = j;
					start_date = projects[i].sprints[j].start_date;
					break;
				}
			}
			break;
		}
	}
	if(sprint_i === null || project_i === null)
		return 'SPRINT_NOT_FOUND';
	if(typeof sprint === 'undefined'){
		sprint_i = projects[project_i].sprints.length;
		start_date = null;
	}
	////////////////////////////////////////////////////
	let newSprint ={
		'_id': sprint_i,
		'name': name,
		'start_date': start_date,
		'duration': duration,
		'scrum_time': time
	};
	projects[project_i].sprints[sprint_i] = newSprint;
	writeDocument('projects', projects[project_i]);
	console.log('DB Updated', projects[project_i]);
	return projects[project_i];
}
module.exports.sprintMaker = sprintMaker;

function removeSprint(project, sprint){
	var projects = readDocument('projects');
	//The following is to get the value of the project and sprint to be added or edited.
	var project_i = null, sprint_i = null;
	for(let i = 0; i < projects.length; i++){
		if (projects[i]._id === project) {
			project_i = i;
			for(let j = 0; j < projects[i].sprints.length; j++){
				if(projects[i].sprints[j]._id === sprint){
					sprint_i = j;
					break;
				}
			}
			break;
		}
	}
	if(sprint_i === null || project_i === null)
		return 'SPRINT_NOT_FOUND';
	//set stories of to null to move them to the backlog
	for(let i in projects[project_i].stories){
		if(projects[project_i].stories[i].sprint_id === sprint)
			projects[project_i].stories[i].sprint_id = null;
	}
	////////////////////////////////////////////////////
	projects[project_i].sprints.splice(sprint_i, 1);
	writeDocument('projects', projects[project_i]);
	console.log('DB Updated', projects[project_i]);
	return projects[project_i];
}
module.exports.removeSprint = removeSprint;
