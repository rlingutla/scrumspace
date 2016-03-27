import { serverUpdateTask, serverPostNewProject, serverPostSprint, serverPutStory } from '../mock_server/server';

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
