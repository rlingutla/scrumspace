import {readDocument, writeDocument, addDocument, initLocalStorage} from './database.js';

/**
 * Emulates how a REST call is *asynchronous* -- it calls your function back
 * some time in the future with data.
 */
function emulateServerReturn(data, error) {
	return new Promise((resolve, reject) => {
		if(error) reject(error);
        else setTimeout(resolve(data), 4);
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
							updatedTask = Object.assign({}, task, {status: toType});
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

	serverLog("DB Updated", updatedTask);

	return emulateServerReturn(updatedTask, updatedTask == undefined);
}