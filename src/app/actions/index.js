import { serverPutTaskState, serverPostNewProject } from '../mock_server/server';

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

function postNewProject(title, description,members){
	return serverPostNewProject(title, description,members);
}

// new project
export const createNewProject = (title, description,members) => {
	return {
		type: 'CREATE_NEW_PROJECT',
		title,
		description,
		members
	};
};

export function postAndCreateNewProject(title, description,members){
	return function(dispatch){
		return postNewProject(title, description,members).then(
       project => {
				 dispatch(createNewProject(title,description,members));
			 },
			 error => console.error('got an error', error)
		);
	};
}
// export function
