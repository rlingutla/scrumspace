'use-strict';
//These imports are insane... we need to break this up
// Schemas
var validate = require('express-jsonschema').validate;

import SprintSchema from '../../schemas/sprint';
import TaskSchema from '../../schemas/task';
import ProjectSchema from '../../schemas/project';
import StorySchema from '../../schemas/story';

import { getUserIdFromToken } from '../shared/authentication';
// Models
var Task = require('../../models/Task');

var MongoDB = require('mongodb');
var ObjectID = MongoDB.ObjectID;

// Project Helper functions
var newProjHelper = require('./newProj');
var newProjCreation = newProjHelper.newProjCreation;
var projUpdate = newProjHelper.projUpdate;
var projectRemoval = newProjHelper.projRemoval;

// Utils
import { embedUsers, packageProjects, projectFromID } from '../shared/projectUtils';
var StandardError = require('../shared/StandardError');

//Router
var express = require('express'),
router = express.Router();


module.exports = function (io, db) {
	router.get('/', function (req, res) {
		res.send('project API handler');
	});

	router.get('/:id', function(req,res){
		res.send({'_id': req.params.id});
	});

	// Project routes
	// add new project
	router.post('/', validate({ body: ProjectSchema }), function(req,res){
		/*
		if (typeof req.body.title === 'undefined' || req.body.description === 'undefined' || req.body.users === 'undefined'){
			res.status(400);
			return res.send({
				error: StandardError({
					status: 400,
					title: 'BAD_INFO'
					})
			});
		}

		var projects = readDocument('projects');
		//console.log(req.body.users);
		var project = newProjCreation(req.body.title, req.body.description, req.body.users,req.body.membersOnProj);
		res.status(201);
		//res.set('Location', '/project' + projects[projects.length-1]._id);
		io.emit('STATE_UPDATE', {data: {
			type: 'NEW_PROJECT',
			project
		}});
		res.send(project);
		*/
	});

	//update project
	router.put('/:project_id', validate({ body: ProjectSchema }), function(req, res){
		//console.log(req.body.title.length);
		if ((req.body.title.length === 0 ) &&  (req.body.users.length === 0)) {
			res.status(400);
			return res.send({error: StandardError({
				status: 400,
				title: 'BAD_INFO'
			})});
		}
		var project = projUpdate(parseInt(req.params.project_id, 10), req.body.title, req.body.users);
		 // Send the update!
		var embeddedProject = embedUsers(project);
		io.emit('STATE_UPDATE', {data: {
			type: 'UPDATE_PROJECT',
			project: embeddedProject
		}});
		res.send(embeddedProject);
	});

	//remove a project
	router.delete('/:project_id', function(req, res){
		var project = projectRemoval(parseInt(req.params.project_id, 10));
		//res.set('Location', '/project/');
		io.emit('STATE_UPDATE', {data: {
			type: 'REMOVE_PROJECT',
			project
		}});
		res.send(project); //returns removed project
	});

	// update a story
	router.put('/:project_id/story/:story_id', function(req, res) {
		// get variables
		var story_id = new ObjectID(req.params.story_id);
		var project_id = new ObjectID(req.params.project_id);

		var story = {};

		if (req.body.sprint_id !== undefined) {
			// is null, or needs an object id
			story.sprint_id = (req.body.sprint_id) ? new ObjectID(req.body.sprint_id) : null;
		}

		if (req.body.description !== undefined) {
			story.description = req.body.description;
		}

		if (req.body.title !== undefined) {
			story.title = req.body.title;
		}

		// todo handle task puts!???
		var pid = req.params.project_id; // TODO: AV: investigate this
		var sid = req.params.story_id;
		// send request to update story
		db.collection('stories').findOneAndUpdate(
			  {'_id': story_id}
			, { $set: story }
			,{ 'returnOriginal': false }
			,
			function(err, result){
				if (err){
					res.status(400).send( {
						error: StandardError({
							status: 400,
							title: 'BAD_INFO'
						})
					});
				}
				io.emit('STATE_UPDATE', {data: {
					type: 'UPDATE_STORY',
					project_id: pid,
					story: result.value
				}});
				res.send();
			}
		);
	});

	// delete a story
	router.delete('/:project_id/story/:story_id', function(req, res) {
		// get variables
		var story_id = new ObjectID(req.params.story_id);
		var project_id = new ObjectID(req.params.project_id);

		db.collection('stories').remove(
			{ '_id': story_id },
			{
				justOne: true
			},
			function (err, result) {
				if (err) {
					res.status(400);
					return res.send({error: StandardError({
						status: 400,
						title: 'Could not delete story!'
					})});							
				}
				
				db.collection('projects').findOneAndUpdate(
					{ 
						_id: project_id 
					},
					{
						$pull: { stories: story_id}
					},
					function (err, result) {
						if (err) {
							res.status(400);
							return res.send({error: StandardError({
								status: 400,
								title: 'Could not delete story!'
							})});							
						}
						io.emit('STATE_UPDATE', {data: {
							type: 'REMOVE_STORY',
							project_id: project_id,
							story: { 
								_id: story_id
							}
						}});
					}
				);
			}
		);
		return res.send();
	});

	// Post a new story
	router.post('/:project_id/story', validate({ body: StorySchema }), function(req, res) {
		// get variables
		var project_id = new ObjectID(req.params.project_id);
		var pid = req.params.project_id;

		var tasks = req.body.tasks.map(function(task) {
			return {
				'status': 'UNASSIGNED',
				'blocked_by': [],
				'assigned_to': [],
				'description': task.description,
				'history': [],
				'attachments': null
			};
		});

		db.collection('tasks').insert(
			tasks
			, function(err, result) {
				if (err) {
					res.status(400).send();
					return;
				} 
				var taskIds = result.insertedIds;
				var newStory = {
					title: req.body.title,
					description: req.body.description,
					tasks: taskIds,
					sprint_id: null
				};
				db.collection('stories').insert(
					newStory,
					function(err, result) {
						if (err) {
							console.log(err);
						} 
						var story_id = result.insertedIds[0];

						db.collection('projects').findOneAndUpdate(
							  { _id: project_id }
							, { $push: { stories: story_id } }
							, { returnOriginal: false }
							, function(err, result) {
								if (err) {
									res.status(400).end();
								}
								// add _ids to tasks
								for (var i = 0; i < tasks.length; i++) {
									newStory.tasks[i] = Object.assign({}, tasks[i], {
										_id: tasks[i]._id.toString()
									});
								}

								newStory._id = story_id; // TODO, this is not elegant!, what's the idiom?
								io.emit('STATE_UPDATE', {
									data: {
										type: 'NEW_STORY',
										project_id: pid,
										story: newStory
									}
								});
								return res.status(200).send();
						});
					}
				);



		});

		
	});

	//Sprint Routes
	router.put('/:projectid/sprint/:sprintid', validate({ body: SprintSchema }), function(req, res){
		let sprintid = new ObjectID(req.params.sprintid);
		db.collection('sprints').updateOne(
			{'_id': sprintid},
			{ $set: {
				'name': req.body.name,
				'start_date': req.body.start_date,
				'duration': req.body.duration,
				'scrum_time': req.body.scrum_time
			}},
			function(err, result){
				if(err){
					//TODO handle error
				}
			}
		);
		io.emit('STATE_UPDATE', {data: {
			type: 'UPDATE_SPRINT',
			project_id: req.params.projectid,
			sprint_id: req.params.sprintid,
			sprint: {
				'_id': sprintid,
				'name': req.body.name,
				'start_date': req.body.start_date,
				'duration': req.body.duration,
				'scrum_time': req.body.scrum_time
			}
		}});
		res.send();
	});

	//End a sprint
	router.put('/:projectid/sprint/:sprintid/end', function(req,res){
		let sprintid = new ObjectID(req.params.sprintid);
		let projectid = new ObjectID(req.params.projectid);
		db.collection('projects').updateOne(
			{
				'_id': projectid
			},
			{ $set: {'current_sprint': null}},
			function(err, result){
				if(err){
					//TODO Handle error
				} // TODO Check number of modified things
				else{
					db.collection('sprints').updateOne(
						{
							'_id': sprintid
						},
						{
							$set: {'end_date': Date.now()}
						},
						function(err, result){
							if(err){
								console.log(err);
								//TODO Handle Error
							}
							projectFromID(new ObjectID(req.user_id), projectid.toString(), db).then(
								(updatedProject) => {
									io.emit('STATE_UPDATE', {data: {
										type: 'UPDATE_PROJECT',
										project: updatedProject
									}});
									res.send();
								},
								(error) => res.sendStatus(500)
							);
						}
					);
				}
			}
		);
	});

	router.put('/:projectid/sprint/:sprintid/start', function(req,res){
		let sprintid = new ObjectID(req.params.sprintid);
		let projectid = new ObjectID(req.params.projectid);
		db.collection('projects').updateOne(
			{
				'_id': projectid,
				'current_sprint': null
			},
			{ $set: {'current_sprint': sprintid}},
			function(err, result){
				if(err){
					//TODO Handle error
				} // TODO Check number of modified things
				else{
					db.collection('sprints').updateOne(
						{
							'_id': sprintid
						},
						{
							'$set': {'start_date': Date.now()}
						},
						function(err, result){
							if(err){
								//TODO Handle Error
							}
							projectFromID(new ObjectID(req.user_id), projectid.toString(), db).then(
								(updatedProject) => {
									io.emit('STATE_UPDATE', {data: {
										type: 'UPDATE_PROJECT',
										project: updatedProject
									}});
									res.send();
								},
								(error) => res.sendStatus(500)
							);
						}
					);
				}
			}
		);
	});

	router.post('/:projectid/sprint', validate({ body: SprintSchema }), function(req, res){
		//models a new sprint
		let sprint = {
			'name': req.body.name,
			'start_date': null,
			'duration': req.body.duration,
			'scrum_time': req.body.scrum_time
		};
		db.collection('sprints').insertOne( sprint, function(err, result){
			if(err){
				//TODO HANDLE ERROR
			}
			sprint._id = result.insertedId.toString();
			//now need to add to project
			db.collection('projects').updateOne(
				{ '_id': new ObjectID(req.params.projectid) },
				{ $push: { sprints: result.insertedId} },
				function(err, result){
					if(err){
						//TODO HANDLE ERROR
						console.log('error', err);
					}
					console.log('no error');
				}
			);
		});
		res.status(201);
		res.set('Location', '/project/' + req.params.projectid + '/sprint/' + sprint._id);
		// Send the update!

		io.emit('STATE_UPDATE', {data: {
			type: 'NEW_SPRINT',
			sprint,
			project_id: req.params.projectid
		}});
		res.send();
	});

	//Delete Sprint
	router.delete('/:projectid/sprint/:sprintid', function(req, res){
		let sprintid = new ObjectID(req.params.sprintid);
		let projectid = new ObjectID(req.params.projectid);
		db.collection('projects').updateOne(
			{
				'_id': projectid,
				'current_sprint': {
					'$ne': sprintid
				}
			},
			{
				$pull: { sprints: sprintid }
			},
			function(err, result){
				if(err){
					//TODO Handle Error
					console.log(err);
				} //TODO check number of modified things
				else{ // else intentional, I don't want this to run if no id was pulled
					console.log('no error');
					db.collection('sprints').remove(
						{'_id': sprintid},
						{justOne: true},
						function(err, result2){
							if(err){
								//TODO HANDLE ERROR
							}
							//Now need to move stories out out out
							db.collection('stories').update(
								{'sprint_id': sprintid},
								{ $set: {
									'sprint_id': null
								}},
								{
									'multi': true
								},
								function(err){
									if(err){
										//TODO Handle error
									}
									projectFromID(new ObjectID(req.user_id), projectid.toString(), db).then(
										(updatedProject) => {
											console.log(updatedProject.stories);
											io.emit('STATE_UPDATE', {data: {
												type: 'REMOVE_SPRINT',
												project: updatedProject,
												project_id: req.params.projectid
											}});
											res.send();
										},
										(error) => res.sendStatus(500)
									);
								}
							);
						}
					);
				}
			}
		);
	});

	// Task Routes
	router.put('/:project_id/story/:story_id/task/:task_id', function(req,res){
		Task.update({
			task_id: req.params.task_id,
			description: req.body.description, 
			status: req.body.status, 
			user: req.user_id
		}, db).then(
			(task) => {
				io.emit('STATE_UPDATE', {data: {
					type: 'UPDATE_TASK',
					task,
					project_id: req.params.project_id,
					story_id: req.params.story_id
				}});
				res.send({data: task});
			},
			(err) => res.sendStatus(404)
		);
	});

	router.put('/:project_id/story/:story_id/task/:task_id/assigned_to', function(req,res) {
		if (Array.isArray(req.body.users)) {
			Task.assignUsers({
				task_id: req.params.task_id,
				users: req.body.users
			}, db).then(
				(task) => {
					io.emit('STATE_UPDATE', {data: {
						type: 'UPDATE_TASK',
						task,
						project_id: req.params.project_id,
						story_id: req.params.story_id
					}});
					res.send({data: task});
				},
				(err) => res.status(err.status).send(err)
			);
		} else {
			res.sendStatus(400);
		}
	});

	router.put('/:project_id/story/:story_id/task/:task_id/blocked_by', function(req,res){

		if (Array.isArray(req.body.blocking)) {
			Task.assignBlocking({
				task_id: req.params.task_id,
				blocking_tasks: req.body.blocking
			}, db).then(
				(task) => {
					io.emit('STATE_UPDATE', {data: {
						type: 'UPDATE_TASK',
						task,
						project_id: parseInt(req.params.project_id, 10),
						story_id: parseInt(req.params.story_id, 10)
					}});
					res.send({data: task});
				},
				(err) => res.status(err.status).send(err)
			);
		} else {
			res.sendStatus(400);
		}

	});

	return router;
};
