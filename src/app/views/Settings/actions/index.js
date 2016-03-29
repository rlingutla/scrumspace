import { serverPutSettings } from '../../../mock_server/server';

export const changeSettingsState = (newSettings) => {
	return {
		type: 'CHANGE_SETTINGS_STATE',
		newSettings: newSettings
	};
};

function putSettings(data, propertiesToUpdate) {
	return serverPutSettings(data, propertiesToUpdate);
}

export function putAndChangeSettings(data, propertiesToUpdate) {
	return function (dispatch) {
		return putSettings(data, propertiesToUpdate).then(
			task => {
				dispatch(changeSettingsState(data, propertiesToUpdate));
			},
			error => console.error('got an error', error)
		);
	};
}