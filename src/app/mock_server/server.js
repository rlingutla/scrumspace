import { readDocument, writeDocument, addDocument, initLocalStorage } from './database.js';
import moment from 'moment';

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
	console.log("SERVER MESSAGE:", ...msg);
}

export function stateTree(userId){
	var userObj = readDocument("users", userId);
	var projects = readDocument("projects");
	var stateTree = {
		user: userObj[userId],
		projects
	};

	return emulateServerReturn(stateTree);
};

export function serverPutTaskState(project_id, story_id, task_id, toType){
	let projects = readDocument("projects");
	let updatedTask, updatedProject;

	projects.map((project) => {
		if(project._id == project_id){
			updatedProject = Object.assign({}, project, { stories: project.stories.map((story) => {
				if(story._id == story_id){
					return Object.assign({}, story, { tasks: story.tasks.map((task) => {
						if(task._id == task_id){
							let historyItem = { fromStatus: task.status, toStatus: toType, modifiedTime: new Date(), modifiedUser: getCurrentUser()}

							return Object.assign({}, task, {
								status: toType, 
								history: [...task.history, historyItem ]
							});
						} else return task;
					})});
				} else return story;
			})});
			return updatedProject;
		} else return project;
	});


	//write updated project object to server
	writeDocument('projects', updatedProject);

	serverLog("DB Updated", updatedTask);

	return emulateServerReturn(updatedTask, updatedTask == undefined);
}

export function serverPostNewProject(title,description){
	// read in all projects, access last project in the array, get it's ID and increment that value
  var projects = readDocument("projects");
	var prevId = projects[projects.length - 1]._id;

	let project = {
		'_id': prevId + 1,
		'title': title,
		'description': description,
		'users': [],
		'status': 'planning',
		'current_sprint': null,
		'sprints': {},
		'stories': []
	};

	writeDocument('projects', project);

	return emulateServerReturn(project, false);

}
