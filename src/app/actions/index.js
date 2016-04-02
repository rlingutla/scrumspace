import { serverUpdateTask, serverPostNewProject, serverPostSprint, serverPutStory, serverRemoveStory, serverRemoveSprint, serverMoveStory, serverMakeNewStory } from '../mock_server/server';

export const updateTaskAction = (project_id, story_id, task) => {
	return {
		type: 'UPDATE_TASK',
		project_id,
		story_id,
		task
	};
};

export function updateTask(project_id, story_id, task){
	return function (dispatch){
		return serverUpdateTask(project_id, story_id, task).then(
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

function postNewProject(	title, description,users,status,current_sprint,avatar,sprints,stories,commits,timeFrame,membersOnProj,gCommits,color){
	return serverPostNewProject(	title, description,users,status,current_sprint,avatar,sprints,stories,commits,timeFrame,membersOnProj,gCommits,color);
}

// new project
export const createNewProject = (	title, description,users,status,current_sprint,avatar,sprints,stories,commits,timeFrame,membersOnProj,gCommits,color) => {
	return {
		type: 'CREATE_NEW_PROJECT',
		title, description,users,status,current_sprint,avatar,sprints,
		stories,commits,timeFrame,membersOnProj,gCommits,color
	};
};

export function postAndCreateNewProject(	title, description,users,status,current_sprint,avatar,sprints,stories,commits,timeFrame,membersOnProj,gCommits,color){
	return function(dispatch){
		return postNewProject(	title, description,users,status,current_sprint,avatar,sprints,stories,commits,timeFrame,membersOnProj,gCommits,color).then(
			project => {
				dispatch(createNewProject(	title, description,users,status,current_sprint,avatar,sprints,stories,commits,timeFrame,membersOnProj,gCommits,color));
			},
			error => console.error('got an error', error)
		);
	};
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
