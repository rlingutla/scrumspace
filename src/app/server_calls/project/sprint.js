import {sendXHRPromise, sendXHR} from '../index';

export function serverUpdateSprint(project, name, duration, time, sprint){
	return sendXHRPromise('PUT', '/api/project/'+project+'/sprint/'+sprint, {
		'name': name.toString(),
		'scrum_time': time.toString(),
		'duration': parseInt(duration, 10)
	}).then((response) => {
		return response;
	},
	(error) => {
		console.error(error);
	});
}

export function serverPostSprint(project, name, duration, time){
	return sendXHRPromise('POST', '/api/project/'+project+'/sprint/', {
		'name': name.toString(),
		'scrum_time': time.toString(),
		'duration': parseInt(duration, 10)
	}).then((response) => {
		return response;
	});
}

export function serverRemoveSprint(project, sprint){
	return sendXHRPromise('DELETE', '/api/project/'+project+'/sprint/'+sprint, undefined).then((response) => {
		return response;
	},
	(error) => {
		console.error(error);
	});
}

export function serverStartSprint(project_id, sprint_id){
	return sendXHRPromise('PUT', `/api/project/${project_id}/sprint/${sprint_id}/start`)
	.then((response) => {
		return response;
	},
	(error) => {
		console.error(error);
	});
}
