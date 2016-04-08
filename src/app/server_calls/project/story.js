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

export function serverMoveStory(projectId, storyId, sprintId){
	return sendXHRPromise('PUT', '/api/project/' + projectId  + '/story/' + storyId + '/sprint_id/' + sprintId,
	{}).then((response) => {
		return response;
	});
}

export function serverRemoveStory(project_id, story_id){
	return sendXHRPromise('DELETE', '/api/project/'+project_id+'/story/'+story_id, undefined).then((response) => {
		return response;
	});
}

// TODO Refactor into two functions
export function serverMakeNewStory(project_id, title, description, tasks, story_id){
	if (typeof story_id === 'undefined') { // if there is no story defined, this post a new story
		return sendXHRPromise('POST', '/api/project/' + project_id + '/story/', {
			title,
			description,
			tasks
		}).then((response) => {
			return response;
		});
	} else {
		return sendXHRPromise('PUT', '/api/project/' + project_id  + '/story/' + story_id, {
			title,
			description,
			tasks
		}).then((response) => {
			return response;
		});
	}
}
