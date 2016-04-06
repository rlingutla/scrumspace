import { readDocument, writeDocument, addDocument, initLocalStorage } from './database.js';
import moment from 'moment';
import _ from 'underscore';

/**
 * Emulates how a REST call is *asynchronous* -- it calls your function back
 * some time in the future with data.
 */

//server will later read user object from req
function getCurrentUser(){
	return 0;
}

function emulateServerReturn(data, error) {
	return new Promise((resolve, reject) => {
		if (error) reject(error);
        else setTimeout((e) => resolve(data), 4);
    });
}

export function initDatabase(){
	initLocalStorage();
}

function serverLog(...msg){
	console.log('SERVER MESSAGE:', ...msg);
}

export function stateTree(userId){
	return sendXHRPromise('get', '/api/init/', { _id: 0}).then((response) => {
		return response;
	});
}

// Project Stuff
/**
 * Adds a new project to the database.
 */
export function serverPostNewProject(title, description,users,status,sprints,stories,cb) {
  return sendXHRPromise('POST', '/api/project/',{
    'title':title,
    'description' : description,
		'users':users,
		'status': status,
		'sprints': sprints,
		'stories': stories
  }).then((response) => {
    // Return the new status update.
    return response;
  });
}

export function serverUpdateProject(project_id,title,members){
	return sendXHRPromise('PUT', '/api/project/' + project_id, {
		'project_id': project_id,
		'title': title,
		'users': members
	}).then((response) => {
		return response;
	});
}

export function serverRemoveProject(project_id){
	debugger;
	return sendXHRPromise('DELETE', '/api/project/' + project_id).then((response) => {
		return response;
	});
}

export function serverPutSettings(newData, properties){
	var oldSettings = readDocument('users', newData._id.toString());

	// check if password (TODO: fix this design AV)
	if (newData.oldPassword === oldSettings.password) {
		oldSettings.password = newData.newPassword;
	} else {
		for (let prop in newData) {
			oldSettings[prop] = newData[prop];
		}
	}

	//write updated project object to server
	writeDocument('users', oldSettings);

	serverLog('DB Updated', oldSettings);
	return emulateServerReturn(oldSettings, false) ;
}

//TODO deprecated
export function serverUpdateTask(project_id, story_id, changedTask){
	let projects = readDocument('projects');
	let updatedTask, updatedProject;

	projects.map((project) => {
		if(project._id === project_id){
			updatedProject = Object.assign({}, project, { stories: project.stories.map((story) => {
				if(story._id === story_id){
					return Object.assign({}, story, { tasks: story.tasks.map((task) => {
						if(task._id === changedTask._id){
							let historyItem = { from_status: task.status, to_status: changedTask.status, modified_time: Date.now(), modified_user: getCurrentUser()};

							updatedTask = Object.assign({}, task, changedTask, {
								history: [
									...task.history,
									historyItem
								]
							});
							return updatedTask;
						} else return task;
					})});
				} else return story;
			})});
			return updatedProject;
		} else return project;
	});


	//write updated project object to server
	writeDocument('projects', updatedProject);

	serverLog('DB Updated', updatedTask);

	return emulateServerReturn(updatedTask, updatedTask === undefined);
}

export function serverAssignUsersToTask(project_id, story_id, task_id, users){
	return sendXHRPromise('PUT', `/api/project/${project_id}/story/${story_id}/task/${task_id}/assigned_to/`, {
		users,
		replace: true
	}).then((response) => {
		return response.data;
	},
	(error) => ErrorBanner(error));
}
export function serverAssignBlockingTasks(project_id, story_id, task_id, blocking){
	return sendXHRPromise('PUT', `/api/project/${project_id}/story/${story_id}/task/${task_id}/blocked_by/`, {
		blocking,
		replace: true
	}).then((response) => {
		return response.data;
	},
	(error) => ErrorBanner(error));
}

export function serverUpdateTask(project_id, story_id, task_id, status, description){
	let updates = {};
	if(status) updates.status = status;
	if(description) updates.description = description;

	return sendXHRPromise('PUT', `/api/project/${project_id}{/story/${story_id}/task/${task_id}`,
		updates
	).then((response) => {
		return response.data;
	},
	(error) => {
		ErrorBanner(error)
	});
}

/*export function serverPostNewProject(title, description,users,status,current_sprint,avatar,sprints,
stories,commits,timeFrame,membersOnProj,gCommits,color){
	// read in all projects, access last project in the array, get it's ID and increment that value
  var projects = readDocument('projects');
	var prevId = projects[projects.length - 1]._id;

	let project = {
		'_id': prevId + 1,
		'title': title,
		'description': description,
		'users': users,
		'status': 'planning',
		'current_sprint': null,
		'avatar': '',
		'sprints': [],
		'stories': [],
		'commits':[Math.floor(Math.random()*10),Math.floor(Math.random()*10),Math.floor(Math.random()*10),Math.floor(Math.random()*10),Math.floor(Math.random()*10)],
    'timeFrame':['Mon','Tues','Wed','Thurs','Fri'],
		'membersOnProj': membersOnProj,
		'gCommits':[10+Math.floor(Math.random()*10),6+Math.floor(Math.random()*10),4+Math.floor(Math.random()*10),8+Math.floor(Math.random()*10),5+Math.floor(Math.random()*10), 7+Math.floor(Math.random()*10), 7+Math.floor(Math.random()*10)],
		'color':'#'+Math.floor(Math.random()*16777215).toString(16)
	};
	writeDocument('projects', project);

	return emulateServerReturn(project, false);

}*/

export function serverPostSprint(project, name, duration, time, sprint){
	if(typeof sprint === 'undefined' || sprint === null){ //TODO this means we have a new sprint
		return sendXHRPromise('POST', '/api/project/'+project+'/sprint/', {
			'name': name,
			'scrum_time': time,
			'duration': duration
		}).then((response) => {
			return response;
		});
	}
	else{ //this means that we have an edited sprint
		return sendXHRPromise('PUT', '/api/project/'+project+'/sprint/'+sprint, {
			'name': name,
			'scrum_time': time,
			'duration': duration
		}).then((response) => {
			return response;
		});
	}
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

// TODO, RENAME SERVER PUT STORY SPRINT ID
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
export function serverRemoveSprint(project, sprint){
	return sendXHRPromise('DELETE', '/api/project/'+project+'/sprint/'+sprint, undefined).then((response) => {
		return response;
	});
}

// todo make this post new story
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

/*
** str: search string
** collection: target collection to search in
** key (optional): key to search on
** limit (optional): number of results
*/
export function search(str, collection, key = '_id', limit=15){
	let searchCollection = readDocument(collection);
	//if it's an object, map the values to an array
	if (_.isObject(searchCollection)) searchCollection = _.values(searchCollection);
	else if(!_.isArray(searchCollection)) return new Error('Supplied collection is invalid');
	//strip some stuff from search
	const escapeRegExp = (str_unesc) => str_unesc.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '');
	let filtered = [];
	//precalculate the regex once (faster)
	let searchExpr = new RegExp(escapeRegExp(str).split('').join('\\w*').replace(/\W/, ''), 'i');
	//loop through collection, find matching elements
	searchCollection.forEach((obj) => {
		if (escapeRegExp(obj[key]).match(searchExpr)) filtered.push(obj);
	});

	return emulateServerReturn(filtered.slice(0, limit), false);
}

var token = 'eyJfaWQiOjB9'; // <-- Put your base64'd JSON token here
/**
 * Properly configure+send an XMLHttpRequest with error handling, authorization token,
 * and other needed properties.
 */
export function sendXHR(verb, resource, body, cb) {
	var xhr = new XMLHttpRequest();
  xhr.open(verb, resource);
  xhr.setRequestHeader('Authorization', 'Bearer ' + token);

  // The below comment tells ESLint that FacebookError is a global.
  // Otherwise, ESLint would complain about it! (See what happens in Atom if
  // you remove the comment...)

  // Response received from server. It could be a failure, though!
  xhr.addEventListener('load', function() {
    var statusCode = xhr.status;
    var statusText = xhr.statusText;
    if (statusCode >= 200 && statusCode < 300) {
      // Success: Status code is in the [200, 300) range.
      // Call the callback with the final XHR object.
      cb(xhr);
    } else {
      // Client or server error.
      // The server may have included some response text with details concerning
      // the error.
      var responseText = xhr.responseText;
      console.log('Could not ' + verb + " " + resource + ": Received " + statusCode + " " + statusText + ": " + responseText);
    }
  });

  // Time out the request if it takes longer than 10,000 milliseconds (10 seconds)
  xhr.timeout = 10000;

  // Network failure: Could not connect to server.
  xhr.addEventListener('error', function() {
    console.log('Could not ' + verb + " " + resource + ": Could not connect to the server.");
  });

  // Network failure: request took too long to complete.
  xhr.addEventListener('timeout', function() {
    console.log('Could not ' + verb + " " + resource + ": Request timed out.");
  });

  switch (typeof(body)) {
    case 'undefined':
      // No body to send.
      xhr.send();
      break;
    case 'string':
      // Tell the server we are sending text.
      xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
      xhr.send(body);
      break;
    case 'object':
      // Tell the server we are sending JSON.
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      // Convert body into a JSON string.
      xhr.send(JSON.stringify(body));
      break;
    default:
      throw new Error('Unknown body type: ' + typeof(body));
  }
}

export function sendXHRPromise(verb, resource, body) {
  return new Promise((resolve, reject) => {
  	var xhr = new XMLHttpRequest();
  	xhr.open(verb, resource);
  	xhr.setRequestHeader('Authorization', 'Bearer ' + token);

  	// The below comment tells ESLint that FacebookError is a global.
  	// Otherwise, ESLint would complain about it! (See what happens in Atom if
  	// you remove the comment...)

  	// Response received from server. It could be a failure, though!
  	xhr.addEventListener('load', function() {
  	  var statusCode = xhr.status;
  	  var statusText = xhr.statusText;
  	  if (statusCode >= 200 && statusCode < 300) {
  	    // Success: Status code is in the [200, 300) range.
  	    // Call the callback with the final XHR object.
  	    resolve(JSON.parse(xhr.responseText));
  	  } else {
  	    // Client or server error.
  	    // The server may have included some response text with details concerning
  	    // the error.
  	    var responseText = xhr.responseText;
  	    let error = `Could not ${verb} ${resource}: Received ${statusCode} ${statusText}: ${responseText}`;

  	    reject(error);

  	  }
  	});

  	// Time out the request if it takes longer than 10,000 milliseconds (10 seconds)
  	xhr.timeout = 10000;

  	// Network failure: Could not connect to server.
  	xhr.addEventListener('error', function() {
  		let error = `Could not ${verb} ${resource}: Could not connect to the server.`;
		console.log(error);
		reject(error);
  	});

  	// Network failure: request took too long to complete.
  	xhr.addEventListener('timeout', function() {
  		let error = `Could not ${verb} ${resource}: Request timed out.`;
		console.log(error);
		reject(error);
  	});

  	switch (typeof(body)) {
  	  case 'undefined':
  	    // No body to send.
  	    xhr.send();
  	    break;
  	  case 'string':
  	    // Tell the server we are sending text.
  	    xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
  	    xhr.send(body);
  	    break;
  	  case 'object':
  	    // Tell the server we are sending JSON.
  	    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  	    // Convert body into a JSON string.
  	    xhr.send(JSON.stringify(body));
  	    break;
  	  default:
  	    throw new Error('Unknown body type: ' + typeof(body));
  	}
  });
}
