import { serverPutTaskState, serverPostNewProject, serverPostSprint } from '../mock_server/server';

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
	// return fetch('https://www.google.com/', { method: 'GET',
	//    mode: 'no-cors'
	// });

	return serverPutTaskState(project_id, story_id, task_id, toType);
}

export function putAndChangeTaskState(project_id, story_id, task_id, toType){
	return function (dispatch) {
		return putTaskState(project_id, story_id, task_id, toType).then(
			task => {
				//dispatch with status from server
				// dispatch(changeTaskState(project_id, story_id, task_id, task.status))
				dispatch(changeTaskState(project_id, story_id, task_id, task))
			},
			error => console.error("got an error", error)
			// sauce => dispatch(makeASandwich(forPerson, sauce)),
			// error => dispatch(apologize('The Sandwich Shop', forPerson, error))
		);
	};
}

function postNewProject(title, description){
	return serverPostNewProject(title, description);
}

// new project
export const createNewProject = (title, description) => {
	return {
		type: 'CREATE_NEW_PROJECT',
		title,
		description
	};
};

export function postAndCreateNewProject(title, description){
	return function(dispatch){
		return postNewProject(title, description).then(
       project => {
				 dispatch(createNewProject(title,description));
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
