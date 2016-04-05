'use-strict';
//Schemas
var SprintSchema = require('../../schemas/sprint');
var TaskSchema = require('../../schemas/task');
var validate = require('express-jsonschema').validate;
//Models
var Task = require('../../models/Task');
//Database Functions
var database = require('../../database');
var readDocument = database.readDocument;
var writeDocument = database.writeDocument;
//Sprint Helper function
var sprintHelper = require('./sprintHelper');
var sprintMaker = sprintHelper.sprintMaker;
var removeSprint = sprintHelper.removeSprint;
//Auth Helpers
var authentication = require('../shared/authentication');
var getUserIdFromToken = authentication.getUserIdFromToken;
var checkAuthFromProject = authentication.checkAuthFromProject;
//Utils
var embedUsers = require('../shared/embedUsers');
var StandardError = require('../shared/StandardError');
import StorySchema from '../../schemas/story';
var validate = require('express-jsonschema').validate;

//Router
var express = require('express'),
	router = express.Router();

router.get('/', function (req, res) {
    res.send('project API handler');
});

router.get('/:id', function(req,res){
	res.send({'_id': req.params.id});
});

// update a story
router.put('/:project_id/story/:story_id',function(req, res) {
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

	var storyToUpdate = projectToUpdate.stories
	.find((story) => story._id === story_id);

	if (storyToUpdate) {
		storyToUpdate = Object.assign(storyToUpdate, {
			title,
			description,
			tasks
		});

		//write updated project object to server
		writeDocument('projects', projectToUpdate);
		res.send(projectToUpdate);
	} else {
		res.status(404);
		res.send();
	}
});

// delete a story
router.delete('/:project_id/story/:story_id', function(req, res) {
	// get variables
	var project_id = parseInt(req.params.project_id, 10);
	var story_id = parseInt(req.params.story_id, 10);

	// database call (this is simulated)
	let projects = readDocument('projects');

	var projectToUpdate = projects
	.find((project) => project._id === project_id);

	// remove this story
	for (var i = 0; i < projectToUpdate.stories.length; i++) {
		if (projectToUpdate.stories[i]._id === story_id) {
			projectToUpdate.stories.splice(i, 1);
		}
	}

	writeDocument('projects', projectToUpdate);	//write updated project to database
	res.send(projectToUpdate);
});

// Post a new story

router.post('/:project_id/story', validate({ body: StorySchema }), function(req, res) {
	var project_id = parseInt(req.params.project_id);
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
		 // Send the update!
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
//parseInt(userid, 10)
router.delete('/:projectid/sprint/:sprintid', function(req, res){
	if(checkAuthFromProject(getUserIdFromToken(req.get('Authorization')), req.params.projectid)){
		var project = removeSprint(parseInt(req.params.projectid, 10), parseInt(req.params.sprintid, 10));
		res.send(embedUsers(project));
	} else{
		// 401: Unauthorized.
    	res.status(401).end();
	}
});

//Task Routes
router.put('/:project_id/story/:story_id/task/:task_id', validate({ body: TaskSchema }), function(req,res){
	console.log("hit update", req.body);
	let user = getUserIdFromToken(req.get('Authorization'));
	if(checkAuthFromProject(user, req.params.project_id)){
		Task.update({
			project_id: parseInt(req.params.project_id, 10), story_id: parseInt(req.params.story_id, 10), task_id: parseInt(req.params.task_id, 10),
			description: req.body.description, status: req.body.status, user: user
		}).then(
			(task) => res.send({data: task}),  
       		(err) => res.sendStatus(404)
       	);
	} else{
		// 401: Unauthorized.
    	res.status(401).end();
	}
});
router.put('/:project_id/story/:story_id/task/:task_id/assigned_to', function(req,res){
	console.log(req.body);
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
				(task) => res.send({data: task}),  
	       		(err) => res.sendStatus(404)
	       	);
		}
		else res.sendStatus(400);
		
	} else{
		// 401: Unauthorized.
    	res.sendStatus(401);
	}
});

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
				(task) => res.send({data: task}),  
	       		(err) => res.sendStatus(404)
	       	);
		}
		else res.sendStatus(400);
	} else{
		// 401: Unauthorized.
    	res.sendStatus(401);
	}
});

module.exports = router;
