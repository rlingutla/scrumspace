import {sendXHRPromise, sendXHR} from '../index';

export function serverAssignUsersToTask(project_id, story_id, task_id, users){
	return sendXHRPromise('PUT', `/api/project/${project_id}/story/${story_id}/task/${task_id}/assigned_to/`, {
		users,
		replace: true
	}).then((response) => {
		return response.data;
	});
}

export function serverAssignBlockingTasks(project_id, story_id, task_id, blocking){
	return sendXHRPromise('PUT', `/api/project/${project_id}/story/${story_id}/task/${task_id}/blocked_by/`, {
		blocking,
		replace: true
	}).then((response) => {
		return response.data;
	});
}

export function serverUpdateTask(project_id, story_id, task_id, status, description){
	let updates = {};
	if(status) updates.status = status;
	if(description) updates.description = description;

	return sendXHRPromise('PUT', `/api/project/${project_id}{/story/${story_id}/task/${task_id}`,
		updates
	).then((response) => {
		return response.data;
	});
}
