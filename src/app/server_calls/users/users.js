import {sendXHRPromise, sendXHR} from '../index';

export function serverPutSettings(newData, properties){
	return sendXHRPromise('PUT', '/api/user/user_id', {
	}).then((response) => {
		return response.data;
	});
}
