import { readDocument, writeDocument, addDocument, initLocalStorage } from './database.js';
import moment from 'moment';
import _ from 'underscore';

/**
 * Emulates how a REST call is *asynchronous* -- it calls your function back
 * some time in the future with data.
 */

//server will later read user object from req
function getCurrentUser(){
	return 0;
}

function emulateServerReturn(data, error) {
	return new Promise((resolve, reject) => {
		if (error) reject(error);
        else setTimeout((e) => resolve(data), 4);
    });
}

export function initDatabase(){
	initLocalStorage();
}

function serverLog(...msg){
	console.log('SERVER MESSAGE:', ...msg);
}

export function stateTree(userId){
	var userObj = readDocument('users', userId);
	var projects = readDocument('projects');
	delete userObj.password; // TODO: this is bad design
	var stateTree = {
		user: userObj[userId],
		projects
	};

	return emulateServerReturn(stateTree);
}

export function serverPutSettings(newData, properties){
	var oldSettings = readDocument('users', newData._id.toString());

	// check if password (TODO: fix this design AV)
	if (newData.oldPassword === oldSettings.password) {
		oldSettings.password = newData.newPassword;
	} else {
		for (let prop in newData) {
			oldSettings[prop] = newData[prop];
		}
	}

	//write updated project object to server
	writeDocument('users', oldSettings);

	serverLog('DB Updated', oldSettings);
	return emulateServerReturn(oldSettings, false) ;
}

export function serverUpdateTask(project_id, story_id, changedTask){
	let projects = readDocument('projects');
	let updatedTask, updatedProject;

	projects.map((project) => {
		if(project._id === project_id){
			updatedProject = Object.assign({}, project, { stories: project.stories.map((story) => {
				if(story._id === story_id){
					return Object.assign({}, story, { tasks: story.tasks.map((task) => {
						if(task._id === changedTask._id){
							let historyItem = { fromStatus: task.status, toStatus: changedTask.status, modifiedTime: Date.now(), modifiedUser: getCurrentUser()};

							updatedTask = Object.assign({}, task, changedTask, {
								history: [
									...task.history,
									historyItem
								]
							});
							return updatedTask;
						} else return task;
					})});
				} else return story;
			})});
			return updatedProject;
		} else return project;
	});


	//write updated project object to server
	writeDocument('projects', updatedProject);

	serverLog('DB Updated', updatedTask);

	return emulateServerReturn(updatedTask, updatedTask === undefined);
}

export function serverPutTaskState(project_id, story_id, task_id, toType){
	let projects = readDocument('projects');
	let updatedTask, updatedProject;

	projects.map((project) => {
		if(project._id === project_id){
			updatedProject = Object.assign({}, project, { stories: project.stories.map((story) => {
				if(story._id === story_id){
					return Object.assign({}, story, { tasks: story.tasks.map((task) => {
						if(task._id === task_id){
							let historyItem = { fromStatus: task.status, toStatus: toType, modifiedTime: Date.now(), modifiedUser: getCurrentUser()};

							updatedTask = Object.assign({}, task, {
								status: toType,
								history: [
									...task.history,
									historyItem
								]
							});

							return updatedTask;
						} else return task;
					})});
				} else return story;
			})});
			return updatedProject;
		} else return project;
	});


	//write updated project object to server
	writeDocument('projects', updatedProject);

	serverLog('DB Updated', updatedTask);

	return emulateServerReturn(updatedTask, updatedTask === undefined);
}

export function serverPutStory(project_id, newStory){
	let projects = readDocument('projects');
	let updatedProject, updatedStory;
	projects.map((project) => {
		if(project._id == project_id){
			updatedProject = Object.assign({}, project, { stories: project.stories.map((story) => {
				if(story._id === newStory._id){
					updatedStory = Object.assign({}, newStory);
					return updatedStory;
				}
				else return story;
			})});
			return updatedProject;
		}
		else return project;
	});
	//write updated project object to server
	writeDocument('projects', updatedProject);
	serverLog('DB Updated', updatedStory);
	return emulateServerReturn(updatedStory, updatedStory === undefined);
}

export function serverPostNewProject(title, description,users,status,current_sprint,avatar,sprints,
stories,commits,timeFrame,membersOnProj,gCommits,color){
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
		'sprints': [],
		'stories': [],
		'commits':[Math.floor(Math.random()*10),Math.floor(Math.random()*10),Math.floor(Math.random()*10),Math.floor(Math.random()*10),Math.floor(Math.random()*10)],
    'timeFrame':['Mon','Tues','Wed','Thurs','Fri'],
		'membersOnProj':['Dylan', 'Abhay', 'Ryan','DJ Trump','Supriya','Niha'],
		'gCommits':[10+Math.floor(Math.random()*10),6+Math.floor(Math.random()*10),4+Math.floor(Math.random()*10),8+Math.floor(Math.random()*10),5+Math.floor(Math.random()*10), 7+Math.floor(Math.random()*10)],
		'color':'#'+Math.floor(Math.random()*16777215).toString(16)
	};
	writeDocument('projects', project);

	return emulateServerReturn(project, false);

}

export function serverPostSprint(project, name, duration, time, sprint){
	//sprint is not passed through if it is a new sprint hence the type is undefined
	var projects = readDocument('projects');
	//The following is to get the value of the project and sprint to be added or edited.
	var project_i, sprint_i;
	for(let i = 0; i < projects.length; i++){
		if (projects[i]._id === project) {
			project_i = i;
			for(let j = 0; j < projects[i].sprints.length && typeof sprint !== 'undefined'; j++){
				if(projects[i].sprints[j]._id === sprint){
					sprint_i = j;
					break;
				}
			}
			break;
		}
	}
	if(typeof sprint === 'undefined')
		sprint_i = projects[project_i].sprints.length;
	////////////////////////////////////////////////////
	let newSprint ={
		'_id': sprint_i,
		'name': name,
		'start_date': null,
		'duration': duration,
		'scrum_time': time
	};
	projects[project_i].sprints[sprint_i] = newSprint;
	writeDocument('projects', projects[project_i]);
	serverLog('DB Updated', projects[project_i]);
	return emulateServerReturn(projects[project_i], false);
}

export function serverMoveStory(project, story, sprint){
	var projects = readDocument('projects');
	var project_i, story_i;
	for(let i = 0; i < projects.length; i++){
		if (projects[i]._id === project) {
			project_i = i;
			for(let j = 0; j < projects[i].stories.length; j++){
				if(projects[i].stories[j]._id === story){
					story_i = j;
					break;
				}
			}
		}
	}
	projects[project_i].story[story_i].sprint_id = sprint;
	writeDocument('projects', projects[project_i]);
	serverLog('DB Updated', projects[project_i]);
	return emulateServerReturn(projects[project_i], false);
}
export function serverRemoveStory(project, story){
	var projects = readDocument('projects');
	var project_i, story_i;
	for(let i = 0; i < projects.length; i++){
		if (projects[i]._id === project) {
			project_i = i;
			for(let j = 0; j < projects[i].sprints.length; j++){
				if(projects[i].stories[j]._id === story){
					story_i = j;
					break;
				}
			}
			break;
		}
	}
	projects[project_i].stories.splice(story_i, 1);
	writeDocument('projects', projects[project_i]);
	serverLog('DB Updated', projects[project_i]);
	return emulateServerReturn(projects[project_i], false);
}
export function serverRemoveSprint(project, sprint){
	var projects = readDocument('projects');
	//The following is to get the value of the project and sprint to be added or edited.
	var project_i, sprint_i;
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
	//set stories of to null to move them to the backlog
	for(let i in projects[project_i].stories){
		if(projects[project_i].stories[i].sprint_id === sprint)
			projects[project_i].stories[i].sprint_id = null;
	}
	////////////////////////////////////////////////////
	projects[project_i].sprints.splice(sprint_i, 1);
	writeDocument('projects', projects[project_i]);
	serverLog('DB Updated', projects[project_i]);
	return emulateServerReturn(projects[project_i], false);
}

export function serverMakeNewStory(project, title, description, tasks, story){
	//story does not need to be passed through
	var projects = readDocument('projects');
	var project_i, story_i, sprint_id;
	for(let i = 0; i < projects.length; i++){
		if (projects[i]._id === project) {
			project_i = i;
			for(let j = 0; j < projects[i].stories.length && typeof story !== 'undefined'; j++){
				if(projects[i].stories[j]._id === story){
					story_i = j;
					sprint_id = projects[i].stories[j].sprint_id;
					break;
				}
			}
			break;
		}
	}
	if(typeof story === 'undefined'){
		story_i = projects[project_i].stories.length;
		sprint_id = null;
	}
	//remove any empty tasks
	tasks = tasks.filter((e) => {
		if(e.description === '')
			return false;
		else
			return true;
	});
	var newTasks = [];
	for(let i = 0; i < tasks.length; i++){
		newTasks[i] = {
			'_id': i,
			'status': 'UNASSIGNED',
			'assignedTo': [],
			'description': tasks[i].description,
			'history': [{
				fromStatus: null,
				toStatus: 'UNASSIGNED',
				modifiedTime: Date.now(),
				modifiedUser : 0
			}],
			'attachements': null
		};
	}
	let newStory = {
		'_id': 'DT-S' + story_i,
		'title': title,
		'description': description,
		'sprint_id': sprint_id,
		'tasks': newTasks
	};
	projects[project_i].stories[story_i] = newStory;
	writeDocument('projects', projects[project_i]);
	serverLog('DB Updated', projects[project_i]);
	return emulateServerReturn(projects[project_i], false);
}

/*
** str: search string
** collection: target collection to search in
** key (optional): key to search on
** limit (optional): number of results
*/
export function search(str, collection, key = '_id', limit=15){
	let searchCollection = readDocument(collection);
	//if it's an object, map the values to an array
	if (_.isObject(searchCollection)) searchCollection = _.values(searchCollection);
	else if(!_.isArray(searchCollection)) return new Error('Supplied collection is invalid');
	//strip some stuff from search
	const escapeRegExp = (str_unesc) => str_unesc.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '');
	let filtered = [];
	//precalculate the regex once (faster)
	let searchExpr = new RegExp(escapeRegExp(str).split('').join('\\w*').replace(/\W/, ''), 'i');
	//loop through collection, find matching elements
	searchCollection.forEach((obj) => {
		if (escapeRegExp(obj[key]).match(searchExpr)) filtered.push(obj);
	});

	return emulateServerReturn(filtered.slice(0, limit), false);
}
