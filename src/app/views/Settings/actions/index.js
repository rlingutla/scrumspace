import { serverPutSettings } from '../../../mock_server/server';

export const changeSettingsState = (project_id, story_id, task_id, task) => {
	return {
		type: 'CHANGE_SETTINGS_STATE',
		project_id,
		story_id,
		task_id,
		task
	};
};

function putSettings(project_id, story_id, task_id, toType) {
	return serverPutSettings(project_id, story_id, task_id, toType);
}

export function putAndChangeSettings(project_id, story_id, task_id, toType) {
	return function (dispatch) {
		return putSettings(project_id, story_id, task_id, toType).then(
			task => {
				//dispatch with status from server
				dispatch(changeSettingsState(project_id, story_id, task_id, task));
			},
			error => console.error('got an error', error)
			// sauce => dispatch(makeASandwich(forPerson, sauce)),
			// error => dispatch(apologize('The Sandwich Shop', forPerson, error))
		);
	};
}