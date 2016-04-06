//TODO: this thing is monolithic :O, need to organize
import {
	serverUpdateTask,
	serverPostNewProject,
	serverUpdateProject,
	serverRemoveProject,
	serverPostSprint,
	serverPutStory,
	serverRemoveStory,
	serverRemoveSprint,
	serverMoveStory,
	serverMakeNewStory,
	serverAssignUsersToTask,
	serverAssignBlockingTasks,
	serverStartSprint
} from '../mock_server/server';
import { browserHistory } from 'react-router'

// Project
function postNewProject(title, description,users,status,current_sprint,avatar,sprints,stories,commits,timeFrame,membersOnProj,gCommits,color){
	return serverPostNewProject(title, description,users,status,current_sprint,avatar,sprints,stories,commits,timeFrame,membersOnProj,gCommits,color);
}

// new project
export const createNewProject = (title, description,users,status,current_sprint,avatar,sprints,stories,commits,timeFrame,membersOnProj,gCommits,color) => {
	return {
		type: 'CREATE_NEW_PROJECT',
		title, description,users,status,current_sprint,avatar,sprints,
		stories,commits,timeFrame,membersOnProj,gCommits,color
	};
};

export function postAndCreateNewProject(title, description,users,status,current_sprint,avatar,sprints,stories,commits,timeFrame,membersOnProj,gCommits,color){
	return function(dispatch){
		return postNewProject(title, description,users,status,current_sprint,avatar,sprints,stories,commits,timeFrame,membersOnProj,gCommits,color).then(
			project => {
				dispatch(createNewProject(title, description,users,status,current_sprint,avatar,sprints,stories,commits,timeFrame,membersOnProj,gCommits,color));
			},
			error => console.error('got an error', error)
		);
	};
}

export const updateProjectAction = (project_id, title,members) => {
	return {
		type: 'UPDATE_PROJECT',
		project_id,
		title,
		members
	};
};
//update fields in the project
export function putProjectUpdates(project_id, title, members){
	return function (dispatch){
		return serverUpdateProject(project_id, title, members).then(
			project => {
				dispatch(updateProjectAction(project_id, title, members));
			},
			error => console.error('Cant update project', error)
		)
	}
}

//remove a project
export const removeProjectAction = (project_id) => {
	return {
		type: 'REMOVE_PROJECT',
		project_id
	};
};
//helps with removing a project
export function removeProject(project_id){
	return function (dispatch){
		debugger;
		return serverRemoveProject(project_id).then(
			project => {
				dispatch(removeProjectAction(project_id));
			},
			error => console.error('Cant remove project', error)
		)
	}
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
			task => {
				dispatch(updateTaskAction(project_id, story_id, task));
			},
			error => console.error('got an error', error)
		)
	}
}

export function assignUsersToTask(project_id, story_id, task_id, users){
	return function (dispatch){
		return serverAssignUsersToTask(project_id, story_id, task_id, users).then(
			task => {
				dispatch(updateTaskAction(project_id, story_id, task));
			},
			error => console.error('got an error', error)
		)
	}
}

export function assignBlockingTasks(project_id, story_id, task_id, blocking){
	return function (dispatch){
		return serverAssignBlockingTasks(project_id, story_id, task_id, blocking).then(
			task => {
				dispatch(updateTaskAction(project_id, story_id, task));
			},
			error => console.error('got an error', error)
		)
	}
}

export const changeStoryState = (project_id, story) => {
	return {
		type: 'CHANGE_STORY_STATE',
		project_id,
		story
	}
}

export function putStory(project_id, story){
	return function(dispatch){
		return serverPutStory(project_id, story).then(
			updStory => {
				dispatch(changeStoryState(project_id, updStory));
			},
			error => console.error('got an error', error)
		);
	}
}

function postNewProjectPlan(signal, data){
	switch (signal) {
		case 'REMOVE_STORY':
			return serverRemoveStory(data.project, data.story);
		case 'NEW_STORY':
			return serverMakeNewStory(data.project, data.title, data.description, data.tasks, data.story);
		case 'REMOVE_SPRINT':
			return serverRemoveSprint(data.project, data.sprint);
		case 'NEW_SPRINT':
			return serverPostSprint(data.project, data.name, data.duration, data.time, data.sprint);
		case 'MOVE_STORY':
			return serverMoveStory(data.project, data.story, data.sprint);
		default:
			console.log('And so here lies Ryan, a sad programmer');
	}
}

export const projectPlan = (signal, data, project) => {
	return{
		type: signal,
		data, project
	};
};

export function postProjectPlan(signal, data){
	return function(dispatch){
		return postNewProjectPlan(signal, data).then(
			project =>{
				dispatch(projectPlan(signal, data, project));
			},
			error => console.error('rip', error)
		);
	};
}

export const startSprintAction = (project) => {
	return {
		type: 'START_SPRINT', project
	};
};

export function putStartSprint(project_id, sprint_id){
	return function(dispatch){
		return serverStartSprint(project_id, sprint_id).then(
			project => {
				dispatch(startSprintAction(project));
				browserHistory.push(`/project/${project_id}/scrumboard`)
			},
			error => console.error('rip', error)
		);
	}
}
