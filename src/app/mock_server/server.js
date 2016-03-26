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
	var userObj = readDocument('users', userId);
	var projects = readDocument('projects');
	delete userObj.password; // TODO: this is bad design
	var stateTree = {
		user: userObj[userId],
		projects
	};

	return emulateServerReturn(stateTree);
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

	return emulateServerReturn(oldSettings, true) ;
}

export function serverPutTaskState(project_id, story_id, task_id, toType){
	let projects = readDocument('projects');
	let updatedTask, updatedProject;

	projects.map((project) => {
		if(project._id === project_id){
			updatedProject = Object.assign({}, project, { stories: project.stories.map((story) => {
				if(story._id === story_id){
					return Object.assign({}, story, { tasks: story.tasks.map((task) => {
						if(task._id === task_id){
							let historyItem = { fromStatus: task.status, toStatus: toType, modifiedTime: Date.now(), modifiedUser: getCurrentUser()};

							updatedTask = Object.assign({}, task, {
								status: toType,
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

export function serverPutStory(project_id, newStory){
	let projects = readDocument('projects');
	let updatedProject, updatedStory;
	projects.map((project) => {
		if(project._id == project_id){
			updatedProject = Object.assign({}, project, { stories: project.stories.map((story) => {
				if(story._id === newStory._id){
					updatedStory = Object.assign({}, newStory);
					return updatedStory;
				}
				else return story;
			})});
			return updatedProject;
		}
		else return project;
	});
	//write updated project object to server
	writeDocument('projects', updatedProject);
	serverLog('DB Updated', updatedStory);
	return emulateServerReturn(updatedStory, updatedStory === undefined);
}

export function serverPostNewProject(title, description,users,status,current_sprint,avatar,sprints,
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
		'sprints': [],
		'stories': [],
		'commits':[Math.floor(Math.random()*10),Math.floor(Math.random()*10),Math.floor(Math.random()*10),Math.floor(Math.random()*10),Math.floor(Math.random()*10)],
    'timeFrame':['Mon','Tues','Wed','Thurs','Fri'],
		'membersOnProj':['Dylan', 'Abhay', 'Ryan','DJ Trump','Supriya','Niha'],
		'gCommits':[10+Math.floor(Math.random()*10),6+Math.floor(Math.random()*10),4+Math.floor(Math.random()*10),8+Math.floor(Math.random()*10),5+Math.floor(Math.random()*10), 7+Math.floor(Math.random()*10)],
		'color':'#'+Math.floor(Math.random()*16777215).toString(16)
	};
	writeDocument('projects', project);

	return emulateServerReturn(project, false);

}

export function serverPostSprint(pid, sid, name, start_date, end_date, scrum_time, stories){
	var project = readDocument('projects');
	//writes sprint data
	//find pid
	stories = stories.filter((e) =>{
		if(e.title === null || e.title === '' || typeof e.title === 'undefined'){
			return false;
		}
		else{
			return true;
		}
	});
	let sprint = {
		'_id': sid,
		'name': name,
		'start_date': parseInt(moment(start_date).format('x')),
		'end_date': parseInt(moment(end_date).format('x')),
		'scrum_time': scrum_time
	};
	(typeof project[pid].sprints[sid] === 'undefined' || project[pid].sprints[sid] === null) ? project[pid].sprints[0] = sprint : project[pid].sprints[sid] = sprint;
	var notInSp = project[pid].stories.filter(
		function(value){
			if(value.sprint_id !== sid){
				return true;
			}
			else {
				return false;
			}
		}
	);
	var nextID = (notInSp.length !== 0) ? notInSp[notInSp.length -1]._id + 1 : 0;
	for(var i = 0; i < stories.length; i++){
		let story = {
			'_id': (nextID+i),
			'title': stories[i].title,
			'description': stories[i].description,
			'sprint_id': sid,
			'tasks': stories[i].tasks.map(
				(e, i) => { let t = {
						'_id': i,
						'status': 'UNASSIGNED',
						'assignedTo': null,
						'description': e.description,
						'history': [{
							fromStatus: null,
							toStatus: 'UNASSIGNED',
							modifiedTime: Date.now(),
							modifiedUser : 0
						}],
						'attachments': null
					};
					return t;
				}
			).filter((e) =>{
				if(e.description === null || e.description === '' || typeof e.description === 'undefined'){
					return false;
				}
				else{
					return true;
				}
			})
		};
		stories[i] = story;
	}
	project[pid].stories = notInSp.concat(stories);
	writeDocument('projects', project[pid]);
	return emulateServerReturn(project[pid], false);
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
