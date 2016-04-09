var database = require('../../database');
var readDocument = database.readDocument;
//This class is read only

/*
	Returns a project's index given its ID
*/
function getProjectIndex(id){
	var projects = readDocument('projects');
	for(let index in projects){
		if(projects[index]._id === id)
			return index;
	}
	return 'PROJECT_NOT_FOUND';
}
module.exports.getProjectIndex = getProjectIndex;

/*
	Returns a sprints's index given the project INDEX and sprint id
*/
function getSprintIndex(project_i, id){
	var projects = readDocument('projects');
	for(let index in projects[project_i].sprints){
		if(projects[project_i].sprints[index]._id === id )
			return index;
	}
	return 'SPRINT_NOT_FOUND';
}
module.exports.getSprintIndex = getSprintIndex;

/*
	Returns a story's index given the project INDEX and story id
*/
function getStoryIndex(project_i, id){
	var projects = readDocument('projects');
	for(let index in projects[project_i].stories){
		if(projects[project_i].stories[index]._id === id )
			return index;
	}
	return 'STORY_NOT_FOUND';
}
module.exports.getStoryIndex = getStoryIndex;
