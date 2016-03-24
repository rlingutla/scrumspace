import { serverPutTaskState, serverPostNewProject, serverPostSprint, serverPutStory } from '../mock_server/server';

export const changeTaskState = (project_id, story_id, task_id, task) => {
	return {
		type: 'CHANGE_TASK_STATE',
		project_id,
		story_id,
		task_id,
		task
	};
};

function putTaskState(project_id, story_id, task_id, toType) {
	return serverPutTaskState(project_id, story_id, task_id, toType);
}

export function putAndChangeTaskState(project_id, story_id, task_id, toType){
	return function (dispatch) {
		return putTaskState(project_id, story_id, task_id, toType).then(
			task => {
				//dispatch with status from server
				dispatch(changeTaskState(project_id, story_id, task_id, task));
			},
			error => console.error('got an error', error)
		);
	};
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

function postNewProject(title, description,users,status,current_sprint,avatar,sprints,stories,commits,gCommits,color){
	return serverPostNewProject(title, description,users,status,current_sprint,avatar,sprints,stories,commits,gCommits,color);
}

// new project
export const createNewProject = (title, description,users,status,current_sprint,avatar,sprints, stories,commits,gCommits,color) => {
	return {
		type: 'CREATE_NEW_PROJECT',
		title, description,users,status,current_sprint,avatar,sprints,
		stories,commits,gCommits,color
	};
};

export function postAndCreateNewProject(title, description,users,status,current_sprint,avatar,sprints,stories,commits,gCommits,color){
	return function(dispatch){
		return postNewProject(title, description,users,status,current_sprint,avatar,sprints,stories,commits,gCommits,color).then(
			project => {
				dispatch(createNewProject(title, description,users,status,current_sprint,avatar,sprints,stories,commits,gCommits,color));
			},
			error => console.error('got an error', error)
		);
	};
}
// export function
export const createNewSprint = (pid, sid, name, start_date, end_date, scrum_time, stories) => {
	return {
		type: 'CREATE_NEW_SPRINT',
		pid,
		sid,
		name,
		start_date,
		end_date,
		scrum_time,
		stories
	};
};

function postNewSprint(pid, sid, name, start_date, end_date, scrum_time, stories){
	return serverPostSprint(pid, sid, name, start_date, end_date, scrum_time, stories);
}

export function postAndCreateNewSprint(pid, sid, name, start_date, end_date, scrum_time, stories){
	return function(dispatch){
		return postNewSprint(pid, sid, name, start_date, end_date, scrum_time, stories).then(
			sprint => {
				dispatch(createNewSprint(pid, sid, name, start_date, end_date, scrum_time, stories));
			},
			error => console.log('rip')
		);
	};
}
