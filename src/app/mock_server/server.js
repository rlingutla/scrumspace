import moment from 'moment';
import _ from 'underscore';
import React from 'react';
import ReactDOM from 'react-dom';

function JSONClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Reset database button.
 */
export class ResetDatabase extends React.Component {
  render() {
    return (
      <button style={{width: 50+'px', height: 50+'px', overflow: 'hidden', fontSize: 12+'px', padding: 0}} className="btn btn-default" type="button" onClick={() => {
        //resetDatabase(); //THIS NEEDS TO BE REMOVED!
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/api/resetdb');
        xhr.addEventListener('load', function() {
          window.alert("Database reset! Refreshing the page now...");
          window.location.href = '/';
          // document.location.reload(false);
        });
        xhr.send();
      }}>Reset Mock DB</button>
    );
  }
}


//server will later read user object from req
function getCurrentUser(){
	return 0;
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
export function serverPostNewProject(title, description,users,membersOnProj,cb) {

  return sendXHRPromise('POST', '/api/project/',{
    'title':title,
    'description' : description,
		'users':users,
		'membersOnProj': membersOnProj
  }).then((response) => {
    // Return the new status update.
    return response;
  },(error) => {
		ErrorBanner('Could not create new project');
	});
}

export function serverUpdateProject(project_id,title,members){
	return sendXHRPromise('PUT', '/api/project/' + project_id, {
		'project_id': project_id,
		'title': title,
		'users': members
	}).then((response) => {
		return response;
	},(error) => {
		ErrorBanner('Could not update project, must have at least 1 field filled in');
	});
}

export function serverRemoveProject(project_id){
	return sendXHRPromise('DELETE', '/api/project/' + project_id).then((response) => {
		return response;
	},(error) => {
		ErrorBanner('Could not delete project');
	});
}

export function serverPutSettings(newData, properties){

	return sendXHRPromise('PUT', `/api/user/user_id`, {

	}).then((response) => {
		return response.data;
	});
}

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

export function serverPostSprint(project, name, duration, time, sprint){
	if(typeof sprint === 'undefined' || sprint === null){ //TODO this means we have a new sprint
		return sendXHRPromise('POST', '/api/project/'+project+'/sprint/', {
			'name': name.toString(),
			'scrum_time': time.toString(),
			'duration': parseInt(duration, 10)
		}).then((response) => {
			return response;
		});
	}
	else{ //this means that we have an edited sprint
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
export function serverRemoveSprint(project, sprint){
	return sendXHRPromise('DELETE', '/api/project/'+project+'/sprint/'+sprint, undefined).then((response) => {
		return response;
	},
	(error) => {
		console.error(error);
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
      var error = 'Could not ' + verb + " " + resource + ": Received " + statusCode + " " + statusText + ": " + responseText;
      console.log(error);
      ErrorBanner(error);
    }
  });

  // Time out the request if it takes longer than 10,000 milliseconds (10 seconds)
  xhr.timeout = 10000;

  // Network failure: Could not connect to server.
  xhr.addEventListener('error', function() {
  	var error = "Could not " + verb + " " + resource + ": Could not connect to the server.";
	ErrorBanner(error); // This is in the global namespace.
    console.log(error);
  });

  // Network failure: request took too long to complete.
  xhr.addEventListener('timeout', function() {
    var error = 'Could not ' + verb + " " + resource + ": Request timed out.";
    ErrorBanner(error);
    console.log(error);
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
  	    ErrorBanner(error);
  	    reject(error);

  	  }
  	});

  	// Time out the request if it takes longer than 10,000 milliseconds (10 seconds)
  	xhr.timeout = 10000;

  	// Network failure: Could not connect to server.
  	xhr.addEventListener('error', function() {
  		let error = `Could not ${verb} ${resource}: Could not connect to the server.`;
		ErrorBanner(error); // This is in the global namespace.
		console.log(error);
		reject(error);
  	});

  	// Network failure: request took too long to complete.
  	xhr.addEventListener('timeout', function() {
  		let error = `Could not ${verb} ${resource}: Request timed out.`;
  		ErrorBanner(error);
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
