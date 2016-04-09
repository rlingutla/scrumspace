import {sendXHRPromise, sendXHR} from '../index';

// TODO, RENAME SERVER PUT STORY SPRINT ID
export function serverPutStory(projectId, storyId, title, description){
	return sendXHRPromise('PUT', `/api/project/${projectId}/story/${storyId}`, {
		title, description
	}).then((response) => {
		let story = response.stories.find((story) => story._id === storyId);
		return story;
	});
}

export function serverRemoveStory(project_id, story_id){
	return sendXHRPromise('DELETE', '/api/project/'+project_id+'/story/'+story_id, undefined).then((response) => {
		return response;
	});
}

export function serverUpdateStory(project_id, title, description, tasks, story_id , sprint_id){
	console.log(sprint_id);
	return sendXHRPromise('PUT', '/api/project/' + project_id  + '/story/' + story_id, {
		title,
		description,
		tasks,
		sprint_id
	}).then((response) => {
		return response;
	});
}

export function serverMakeNewStory(project_id, title, description, tasks, story_id){
	return sendXHRPromise('POST', '/api/project/' + project_id + '/story/', {
		title,
		description,
		tasks
	}).then((response) => {
		return response;
	});
}
