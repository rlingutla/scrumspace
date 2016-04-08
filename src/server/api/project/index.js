'use-strict';
// Schemas
var validate = require('express-jsonschema').validate;

import SprintSchema from '../../schemas/sprint';
import TaskSchema from '../../schemas/task';
import NewProjSchema from '../../schemas/project';
import StorySchema from '../../schemas/story';

// Models
var Task = require('../../models/Task');
//Database Functions
var database = require('../../database');
var readDocument = database.readDocument;
var writeDocument = database.writeDocument;
var deleteDocument = database.deleteDocument;
var addDocument = database.addDocument;
var getCollection = database.getCollection;
//Sprint Helper function
var sprintHelper = require('./sprintHelper');
var sprintMaker = sprintHelper.sprintMaker;
var removeSprint = sprintHelper.removeSprint;
//New Proejct Helper functions
var newProjHelper = require('./newProj');
var newProjCreation = newProjHelper.newProjCreation;
var projUpdate = newProjHelper.projUpdate;
var projectRemoval = newProjHelper.projRemoval;
//Auth Helpers
var authentication = require('../shared/authentication');
var getUserIdFromToken = authentication.getUserIdFromToken;
var checkAuthFromProject = authentication.checkAuthFromProject;
//Utils
var embedUsers = require('../shared/embedUsers');
var StandardError = require('../shared/StandardError');
//Router
var express = require('express'),
router = express.Router();

module.exports = function (io) {

	router.get('/', function (req, res) {
		res.send('project API handler');
	});

	router.get('/:id', function(req,res){
		res.send({'_id': req.params.id});
	});

	//New Project Routes
	//add new project
	router.post('/', validate({ body: NewProjSchema }), function(req,res){
	  	var fromUser = getUserIdFromToken(req.get('Authorization'));
			//console.log('From user: '+fromUser);
			if(typeof req.body.title === 'undefined' || req.body.description === 'undefined' || req.body.users === 'undefined'){
				res.status(400);
				return res.send({error: StandardError({
					status: 400,
					title: 'BAD_INFO'
				})});
			}

				var projects = readDocument('projects');
				//console.log(req.body.users);
				var project = newProjCreation(req.body.title, req.body.description, req.body.users,req.body.membersOnProj);
				res.status(201);
				//res.set('Location', '/project' + projects[projects.length-1]._id);
				res.send(project);
	});

	//update project
	router.put('/:projectid', validate({ body: NewProjSchema }), function(req, res){
		//console.log(req.body.title.length);
		if((req.body.title.length === 0 ) &&  (req.body.users.length === 0)){
			res.status(400);
			return res.send({error: StandardError({
				status: 400,
				title: 'BAD_INFO'
			})});
		}
		var project = projUpdate(parseInt(req.params.projectid, 10), req.body.title, req.body.users);
		 // Send the update!
		res.send(embedUsers(project));
	});


	//remove a project
	router.delete('/:project_id', function(req, res){

			var project = projectRemoval(parseInt(req.params.project_id, 10));
			//res.set('Location', '/project/');
			res.send(project); //returns removed project_id

	});

	// update a story
	router.put('/:project_id/story/:story_id',function(req, res) {
		if (checkAuthFromProject(getUserIdFromToken(req.get('Authorization')), req.params.project_id)) {
			// get variables
			var project_id = parseInt(req.params.project_id, 10);
			var story_id = parseInt(req.params.story_id, 10);
			var title = req.body.title;
			var description = req.body.description;
			var tasks = req.body.tasks;

			// database call (this is simulated)
			let projects = readDocument('projects');

			var projectToUpdate = projects
			.find((project) => project._id === project_id);

			var storyToUpdate = projectToUpdate
			.stories
			.find((story) => {
				return story._id === story_id;
			});

			if (storyToUpdate) {
				if (title) {
					storyToUpdate.title = title;
				}
				if (tasks) {
					storyToUpdate.tasks = tasks.map((task, i) =>  {
						// TODO: model
						return Object.assign({
							'_id': i,
							'status': 'UNASSIGNED',
							'assigned_to': [],
							'blocked_by': [],
							'description': task.description,
							'history': [{
								from_status: null,
								to_status: 'UNASSIGNED',
								modified_time: Date.now(),
								modified_user : 0
							}],
							'attachments': null
						}, storyToUpdate.tasks[i], task);
					});
				}
				if (description) {
					storyToUpdate.description = description;
				}
				//write updated project object to server
				writeDocument('projects', projectToUpdate);

				io.emit('STATE_UPDATE', {data: {
					type: 'CHANGE_STORY_STATE',
					project_id: parseInt(req.params.project_id, 10),
					story: storyToUpdate
				}});

				res.send(embedUsers(projectToUpdate));
			} else {
				res.status(404);
				res.send();
			}
		} else {
			// 401: Unauthorized.
	    	res.status(401).end();
		}
	});

	// delete a story
	router.delete('/:project_id/story/:story_id', function(req, res) {
		// get variables
		if (checkAuthFromProject(getUserIdFromToken(req.get('Authorization')), req.params.project_id)) {

			var project_id = parseInt(req.params.project_id, 10);
			var story_id = parseInt(req.params.story_id, 10);

			// database call (this is simulated)
			let projects = readDocument('projects');

			var projectToUpdate = projects
			.find((project) => project._id === project_id);

			// remove this story
			for (var i = 0; i < projectToUpdate.stories.length; i++) {
				if (projectToUpdate.stories[i]._id === story_id) {
					if(projectToUpdate.stories[i].sprint_id === null)
						projectToUpdate.stories.splice(i, 1);
					else
						projectToUpdate.stories[i].sprint_id = null;
				}
			}
			writeDocument('projects', projectToUpdate);	//write updated project to database

			res.send(embedUsers(projectToUpdate));
		} else{
			// 401: Unauthorized.
	    	res.status(401).end();
		}
	});

	// Post a new story

	router.post('/:project_id/story', validate({ body: StorySchema }), function(req, res) {
		if (checkAuthFromProject(getUserIdFromToken(req.get('Authorization')), req.params.project_id)) {
			var project_id = parseInt(req.params.project_id, 10);
			var title = req.body.title;
			var description = req.body.description;
			var tasks = req.body.tasks;
			var storyId = (req.body.storyId === 'null') ? null : req.body.storyId; // todo: noooo!

			var projects = readDocument('projects');

			var project_i, story_i, sprint_id;
			for (let i = 0; i < projects.length; i++){
				if (projects[i]._id === project_id) {
					project_i = i;
					for (let j = 0; j < projects[i].stories.length && typeof story !== 'undefined'; j++){
						if (projects[i].stories[j]._id === storyId){
							story_i = j;
							sprint_id = projects[i].stories[j].sprint_id;
							break;
						}
					}
					break;
				}
			}

			if (typeof story === 'undefined'){
				story_i = projects[project_i].stories.length;
				sprint_id = null;
			}

			//remove any empty tasks
			tasks = tasks.filter((e) => {
				if (e.description === '')
					return false;
				else
					return true;
			});


			var newTasks = [];
			for (let i = 0; i < tasks.length; i++) {
				newTasks[i] = {
					'_id': i,
					'status': 'UNASSIGNED',
					'assigned_to': [],
					'blocked_by': [],
					'description': tasks[i].description,
					'history': [{
						from_status: null,
						to_status: 'UNASSIGNED',
						modified_time: Date.now(),
						modified_user : 0
					}],
					'attachments': null
				};
			}
			let newStory = {
				'_id': parseInt(story_i, 10),
				'title': title,
				'description': description,
				'sprint_id': sprint_id,
				'tasks': newTasks
			};

			projects[project_i].stories[story_i] = newStory;
			writeDocument('projects', projects[project_i]);
			res.send(embedUsers(projects[project_i]));
		} else {
			// 401: Unauthorized.
	    	res.status(401).end();
		}
	});


	// update story.sprint_id
	router.put('/:project_id/story/:story_id/sprint_id/:sprint_id', function (req, res) {
		var projectId = parseInt(req.params.project_id, 10);
		var sprintId = parseInt(req.params.sprint_id, 10);
		var projects = readDocument('projects');
		var project_i, story_i;

		for(let i = 0; i < projects.length; i++){
			if (projects[i]._id === projectId) {
				project_i = i;
				for(let j = 0; j < projects[i].stories.length; j++){
					if(projects[i].stories[j]._id === parseInt(req.params.story_id, 10)) {
						story_i = j;
						break;
					}
				}
			}
		}

		if (projects[project_i].stories[story_i] !== null) {
			projects[project_i].stories[story_i].sprint_id = sprintId;
			writeDocument('projects', projects[project_i]);
			res.send(embedUsers(projects[project_i]));
		} else {
			// TODO BETTER
			res.status(400);
			res.send({});
		}

	});

	//Sprint Routes
	router.put('/:projectid/sprint/:sprintid', validate({ body: SprintSchema }), function(req, res){
		if(checkAuthFromProject(getUserIdFromToken(req.get('Authorization')), req.params.projectid)){
			var project = sprintMaker(parseInt(req.params.projectid, 10), req.body.name, parseInt(req.body.duration, 10), req.body.scrum_time, parseInt(req.params.sprintid, 10));

			 if(project === 'SPRINT_NOT_FOUND'){
				res.status(400);
	 			return res.send({error: StandardError({
	 				status: 400,
	 				title: 'INVALID_ACTION',
	 				detail: 'Sprint does not exist!'
	 			})});
			 }

			res.send(embedUsers(project));
		} else{
			// 401: Unauthorized.
			res.status(401).end();
		}
	});

	router.put('/:projectid/sprint/:sprintid/start', function(req,res){
		if(checkAuthFromProject(getUserIdFromToken(req.get('Authorization')), req.params.projectid)){
			let project = readDocument('projects').find((project) => project._id === parseInt(req.params.projectid, 10));
			let sprint = (project) ? project.sprints.find((sprint) => sprint._id === parseInt(req.params.sprintid, 10)):undefined;

			if(typeof project === 'undefined' || typeof sprint === 'undefined'){
				res.status(400);
				return res.send({error: StandardError({
					status: 400,
					title: 'OBJECT_NOT_FOUND'
				})});
			}

			if(project.current_sprint !== null){
				res.status(400);
				return res.send({error: StandardError({
					status: 400,
					title: 'INVALID_ACTION',
					detail: 'Project is already in a sprint'
				})});
			}
			//start the sprint
			project.current_sprint = parseInt(req.params.sprintid, 10);
			project.sprints[sprint._id].start_date = Date.now();

			writeDocument('projects', project);
			return res.send(embedUsers(project));
		} else{
			// 401: Unauthorized.
			res.status(401).end();
		}
	});

	router.post('/:projectid/sprint', validate({ body: SprintSchema }), function(req, res){
		//going to have to eventually add user tokens...
		if(checkAuthFromProject(getUserIdFromToken(req.get('Authorization')), req.params.projectid)){

			var project = sprintMaker(parseInt(req.params.projectid, 10), req.body.name, parseInt(req.body.duration, 10), req.body.scrum_time);
			res.status(201);
			res.set('Location', '/project/' + req.params.projectid + '/sprint/' + project.sprints[project.sprints.length-1]._id);
			// Send the update!
			res.send(embedUsers(project));
		} else{
			// 401: Unauthorized.
			res.status(401).end();
		}
	});

	//Delete Sprint
	router.delete('/:projectid/sprint/:sprintid', function(req, res){
		if(checkAuthFromProject(getUserIdFromToken(req.get('Authorization')), req.params.projectid)){
			var project = removeSprint(parseInt(req.params.projectid, 10), parseInt(req.params.sprintid, 10));
			if(project === 'SPRINT_NOT_FOUND'){
				res.status(400);
				return res.send({error: StandardError({
					status: 400,
					title: 'INVALID_ACTION',
					detail: 'Sprint does not exist!'
				})});
			}
			res.send(embedUsers(project));
		} else{
			// 401: Unauthorized.
			res.status(401).end();
		}
	});

	//Task Routes
	router.put('/:project_id/story/:story_id/task/:task_id', function(req,res){
		let user = getUserIdFromToken(req.get('Authorization'));
		if(checkAuthFromProject(user, req.params.project_id)){
			Task.update({
				project_id: parseInt(req.params.project_id, 10), story_id: parseInt(req.params.story_id, 10), task_id: parseInt(req.params.task_id, 10),
				description: req.body.description, status: req.body.status, user: user
			}).then(
				(task) => {
					io.emit('STATE_UPDATE', {data: {
						type: 'UPDATE_TASK',
						task, 
						project_id: parseInt(req.params.project_id, 10),
						story_id: parseInt(req.params.story_id, 10)
					}});

					res.send({data: task})
				},
	       		(err) => res.sendStatus(404)
	       	);

		} else{
			// 401: Unauthorized.
			res.status(401).end();
		}
	});

	router.put('/:project_id/story/:story_id/task/:task_id/assigned_to', function(req,res){
		//console.log(req.body);
		let user = getUserIdFromToken(req.get('Authorization'));
		if(checkAuthFromProject(user, req.params.project_id)){
			if(Array.isArray(req.body.users)){
				Task.assignUsers({
					project_id: parseInt(req.params.project_id, 10),
					story_id: parseInt(req.params.story_id, 10),
					task_id: parseInt(req.params.task_id, 10),
					users: req.body.users,
					replace: req.body.replace
				}).then(
					(task) => {
						io.emit('STATE_UPDATE', {data: {
							type: 'UPDATE_TASK',
							task, 
							project_id: parseInt(req.params.project_id, 10),
							story_id: parseInt(req.params.story_id, 10)
						}});
						res.send({data: task})
					},
					(err) => res.sendStatus(404)
				);
			}
			else res.sendStatus(400);

		} else{
			// 401: Unauthorized.
			res.sendStatus(401);
		}
	});

	//Delete Task
	router.delete('/:project_id/story/:story_id/task/:task_id', function(req, res){
		if(checkAuthFromProject(getUserIdFromToken(req.get('Authorization')), req.params.project_id)){
			var projectId = (parseInt(req.params.project_id, 10));
			var storyId = (parseInt(req.params.story_id, 10));
			var taskId = (parseInt(req.params.task_id, 10));
			var project = readDocument('projects', projectId);
			var project_i, story_i, task_i;
			for(let j = 0; j < project.stories.length; j++){
				if(project.stories[j]._id === storyId){
					story_i = j;
					for(let k = 0; k < project.stories[j].tasks.length; k++){
						if(project.stories[j].tasks[k]._id === taskId){
							task_i = k;
							break;
						}
					}
					break;
				}
			}
			project.stories[story_i].tasks.splice(task_i, 1);
			writeDocument('projects', project);
			console.log('DB Updated', project);
			res.send(project);
		} else{
			//401: Unauthorized.
			res.status(401).end();
		}
	});

	//Post Task
	router.post('/:project_id/story/:story_id/task', validate({ body: TaskSchema }), function(req, res){
		if(checkAuthFromProject(getUserIdFromToken(req.get('Authorization')), req.params.project_id)){
			var projectId = (parseInt(req.params.project_id, 10));
			var storyId = (parseInt(req.params.story_id, 10));
			var taskId = (req.body.task_id === 'null') ? null : req.body.task_id;
			var project = readDocument('projects', projectId);
			var project_i, story_i, task_i;
			for(let j = 0; j < project.stories.length; j++){
				if(project.stories[j]._id === storyId){
					story_i = j;
					for(let k = 0; k < project.stories[j].tasks.length && typeof task !== 'undefined'; k++){
						if(project.stories[j].tasks[k]._id === taskId){
							task_i = k;
							break;
						}
					}
					break;
				}
			}

			if (typeof task === 'undefined'){
				task_i = project.stories[story_i].tasks.length;
			}

			let newTask = {
				'_id': parseInt(task_i, 10),
				'status': req.body.status,
				'assigned_to': [],
				'blocked_by': [],
				'description': req.body.description,
				'history': [{
					from_status: null,
					to_status: req.body.status,
					modified_time: Date.now(),
					modified_user : 0
				}],
				'attachments': null
			};

			project.stories[story_i].tasks[task_i] = newTask;
			writeDocument('projects', project.stories[story_i].tasks[task_i]);
			// Send the update!
			res.send(embedUsers(project));
		} else{
			// 401: Unauthorized.
			res.status(401).end();
		}
	});


	// router.delete('/:project_id/story/:story_id/task/:task_id/assigned_to', function(req,res){
	// 	let user = getUserIdFromToken(req.get('Authorization'));
	// 	if(checkAuthFromProject(user, req.params.project_id)){
	// 		if(Array.isArray(req.body.users)){
	// 			Task.assignUsers({
	// 				project_id: parseInt(req.params.project_id, 10),
	// 				story_id: parseInt(req.params.story_id, 10),
	// 				task_id: parseInt(req.params.task_id, 10),
	// 				users: req.body.users,
	// 				replace: req.body.replace
	// 			}, true).then(
	// 				(task) => res.send({data: task}),
	// 	       		(err) => res.sendStatus(404)
	// 	       	);
	// 		}
	// 		else res.sendStatus(400);

	// 	} else{
	// 		// 401: Unauthorized.
	//     	res.sendStatus(401);
	// 	}
	// });

	router.put('/:project_id/story/:story_id/task/:task_id/blocked_by', function(req,res){
		let user = getUserIdFromToken(req.get('Authorization'));
		if(checkAuthFromProject(user, req.params.project_id)){
			if(Array.isArray(req.body.blocking)){
				Task.assignBlocking({
					project_id: parseInt(req.params.project_id, 10),
					story_id: parseInt(req.params.story_id, 10),
					task_id: parseInt(req.params.task_id, 10),
					blocking_tasks: req.body.blocking,
					replace: req.body.replace
				}).then(
					(task) => {
						io.emit('STATE_UPDATE', {data: {
							type: 'UPDATE_TASK',
							task, 
							project_id: parseInt(req.params.project_id, 10),
							story_id: parseInt(req.params.story_id, 10)
						}});
						res.send({data: task})
					},

		       		(err) => res.sendStatus(404)
		       	);
			}
			else res.sendStatus(400);
		} else{
			// 401: Unauthorized.
			res.sendStatus(401);
		}
	});

	// router.delete('/:project_id/story/:story_id/task/:task_id/blocked_by', function(req,res){
	// 	let user = getUserIdFromToken(req.get('Authorization'));
	// 	if(checkAuthFromProject(user, req.params.project_id)){
	// 		if(Array.isArray(req.body.blocking)){
	// 			Task.assignBlocking({
	// 				project_id: parseInt(req.params.project_id, 10),
	// 				story_id: parseInt(req.params.story_id, 10),
	// 				task_id: parseInt(req.params.task_id, 10),
	// 				blocking_tasks: req.body.blocking,
	// 				replace: req.body.replace
	// 			}, true).then(
	// 				(task) => res.send({data: task}),
	// 	       		(err) => res.sendStatus(404)
	// 	       	);
	// 		}
	// 		else res.sendStatus(400);
	// 	} else{
	// 		// 401: Unauthorized.
	//     	res.sendStatus(401);
	// 	}
	// });

	return router;
}
