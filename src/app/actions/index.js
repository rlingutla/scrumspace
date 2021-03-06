import {serverPostNewProject, serverUpdateProject, serverRemoveProject} from '../server_calls/project/project';
import {serverPutStory, serverRemoveStory, serverMakeNewStory, serverUpdateStory} from '../server_calls/project/story';
import {serverAssignUsersToTask, serverAssignBlockingTasks, serverUpdateTask} from '../server_calls/project/task';
import {serverPostSprint, serverRemoveSprint, serverStartSprint, serverUpdateSprint} from '../server_calls/project/sprint';
import { browserHistory } from 'react-router';

// new project
export const createNewProjectAction = (project) => {
	return { type: 'NEW_PROJECT', project };
};

export function postAndCreateNewProject(title, description,users){
	return function(dispatch){
		return serverPostNewProject(title, description,users).then(
			project => {
				dispatch(createNewProjectAction(project));
			},
			error => logger('got an error', error)
		);
	};
}

export const updateProjectAction = (project) => {
	return { type: 'UPDATE_PROJECT', project };
};
//update fields in the project
export function putProjectUpdates(project_id, title, members, githubRepo, githubOwner){

	return function (dispatch){
		return serverUpdateProject(project_id, title, members, githubRepo, githubOwner).then(
			project => dispatch(updateProjectAction(project)),
			error => logger('Cant update project', error)
		);
	};
}

//remove a project
export const removeProjectAction = (project) => {
	return { type: 'REMOVE_PROJECT', project };
};

//helps with removing a project
export function removeProject(project_id){
	return function (dispatch){
		return serverRemoveProject(project_id).then(
			project => {
				dispatch(removeProjectAction(project));
				browserHistory.push('/project/');
			},
			error => logger('Cant remove project', error)
		);
	};
}

// TASK
export const updateTaskAction = (project_id, story_id, task) => {
	return {
		type: 'UPDATE_TASK',
		project_id,
		story_id,
		task
	};
};

export function updateTask(project_id, story_id, task_id, status, description){
	return function (dispatch){
		return serverUpdateTask(project_id, story_id, task_id, status, description).then(
			// task => dispatch(updateTaskAction(project_id, story_id, task)),
			task => logger('TASK UPDATED', task),
			error => logger('got an error', error)
		);
	};
}

export function assignUsersToTask(project_id, story_id, task_id, users){
	return function (dispatch){
		return serverAssignUsersToTask(project_id, story_id, task_id, users).then(
			// task => dispatch(updateTaskAction(project_id, story_id, task)),
			task => logger('success'),
			error => logger('got an error', error)
		);
	};
}

export function assignBlockingTasks(project_id, story_id, task_id, blocking){
	return function (dispatch){
		return serverAssignBlockingTasks(project_id, story_id, task_id, blocking).then(
			task => dispatch(updateTaskAction(project_id, story_id, task)),
			error => logger('got an error', error)
		);
	};
}

export const updateStoryAction = (project_id, story) => {
	return {
		type: 'UPDATE_STORY',
		project_id,
		story
	};
};

export function putStory(project_id, story_id, title, description){
	return function(dispatch){
		return serverPutStory(project_id, story_id, title, description).then(
			story => dispatch(updateStoryAction(project_id, story)),
			error => logger('got an error', error)
		);
	};
}

function postNewProjectPlan(signal, data){
	switch (signal) {
		case 'REMOVE_STORY':
			return serverRemoveStory(data.project, data.story_id);
		case 'NEW_STORY':
			return serverMakeNewStory(data.project, data.title, data.description, data.tasks);
		case 'REMOVE_SPRINT':
			return serverRemoveSprint(data.project, data.sprint_id);
		case 'NEW_SPRINT':
			return serverPostSprint(data.project, data.name, data.duration, data.time);
		case 'UPDATE_STORY':
			return serverUpdateStory(data.project, data.title, data.description, data.tasks, data.story_id, data.sprint_id);
		case 'UPDATE_SPRINT':
			return serverUpdateSprint(data.project, data.name, data.duration, data.time, data.sprint_id);
		default:
			logger('No Signal', signal);
	}
}

export const projectPlan = (signal, data, object) => {
	return{
		type: signal,
		project_id: data.project,
		sprint_id: data.sprint_id,
		story_id: data.story_id,
		sprint: object,
		story: object,
		project: object
	};
};

export function postProjectPlan(signal, data){
	return function(dispatch){
		return postNewProjectPlan(signal, data).then(
			sprint => dispatch(projectPlan(signal, data, sprint)),
			error => logger('rip', error)
		);
	};
}

export const startSprintAction = (project) => {
	return { type: 'UPDATE_PROJECT', project };
};

export function putStartSprint(project_id, sprint_id){
	return function(dispatch){
		return serverStartSprint(project_id, sprint_id).then(
			project => {
				dispatch(startSprintAction(project));
				browserHistory.push(`/project/${project_id}/scrumboard`);
			},
			error => logger('rip', error)
		);
	};
}
