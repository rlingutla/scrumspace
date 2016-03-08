import { serverPutTaskState } from '../mock_server/server';

export const changeTaskState = (project_id, story_id, task_id, toType) => {
	return {
		type: 'CHANGE_TASK_STATE',
		project_id,
		story_id,
		task_id,
		toType
	}
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
				dispatch(changeTaskState(project_id, story_id, task_id, task.status))
			},
			error => console.error("got an error", error)
			// sauce => dispatch(makeASandwich(forPerson, sauce)),
			// error => dispatch(apologize('The Sandwich Shop', forPerson, error))
		);
	};
}
