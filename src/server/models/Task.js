'use strict';

var database = require('../database');
var readDocument = database.readDocument;
var writeDocument = database.writeDocument;
var StandardError = require('../api/shared/StandardError');
var ObjectID = require('mongodb').ObjectID;

var _ = require('underscore');

//Task
module.exports.update = function(args){
	//TODO refactor to just grab the single project
	let projects = readDocument('projects');
	let updatedTask, updatedProject;

	return new Promise((resolve, reject) => {

		projects.map((project) => {
			if(project._id === args.project_id){
				updatedProject = Object.assign({}, project, { stories: project.stories.map((story) => {
					if(story._id === args.story_id){
						return Object.assign({}, story, { tasks: story.tasks.map((task) => {
							if(task._id === args.task_id){
								//define a new history item if status is changed TODO: expand to more types of history objects
								let historyItem = (args.status) ? { 
									from_status: task.status, 
									to_status: args.status, 
									modified_time: Date.now(), 
									modified_user: args.user}:{}

								let updatedFields = {};
								if(args.status){
									updatedFields.status = args.status;

									//movement logic TODO: move out if logic grows
									//moving from blocking
									if(task.status === 'BLOCKED' && args.status !== 'BLOCKED'){
										updatedFields.blocked_by = [];
									}
								}
								if(args.description){
									updatedFields.description = args.description;
								}

								updatedTask = Object.assign({}, task, updatedFields, {
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

		if(typeof updatedTask === undefined) {
			return reject(StandardError({
				status: 404,
				title: 'OBJECT_NOT_FOUND'
			}));
		}

		//write updated project object to server
		writeDocument('projects', updatedProject);
		
		//resolve promise
		return resolve(updatedTask);
	});
};

module.exports.assignUsers = function(args, db){
	return new Promise((resolve, reject) => {
		db.collection('users').find({ '_id': { $in: args.users.map((id) => new ObjectID(id)) }}).toArray((err, users) => {
			if(err) return reject(StandardError({ status: 404, title: 'OBJECT_NOT_FOUND' }));
			else {
				//all users found
				if(users.length === args.users.length){
					db.collection('tasks').findOneAndUpdate(
						{_id: new ObjectID(args.task_id)}, 
						{ $set: { 'assigned_to' : args.users} },
						{ returnNewDocument : true },
						(err, res) => {
							if(err) reject(err);
							else {
								if(res === null) return reject(StandardError({ status: 404, title: 'OBJECT_NOT_FOUND' }));
								else return resolve(Object.assign({}, res.value, { assigned_to: args.users })); // returnNewDocument not working...?
							}
						}
					);
				}
				else return reject(StandardError({ status: 404, title: 'OBJECT_NOT_FOUND' }));
			}
		});
	});
};


module.exports.assignBlocking = function(args, db){
	return new Promise((resolve, reject) => {
		db.collection('users').find({ '_id': { $in: args.blocking_tasks.map((id) => new ObjectID(id)) }}).toArray((err, users) => {
			if(err) return reject(StandardError({ status: 404, title: 'OBJECT_NOT_FOUND' }));
			else {
				//all users found
				if(users.length === args.blocking_tasks.length){
					db.collection('tasks').findOneAndUpdate(
						{_id: new ObjectID(args.task_id)}, 
						{ $set: { 'blocked_by' : args.blocking_tasks} },
						{ returnNewDocument : true },
						(err, res) => {
							if(err) reject(err);
							else {
								if(res === null) return reject(StandardError({ status: 404, title: 'OBJECT_NOT_FOUND' }));
								else return resolve(Object.assign({}, res.value, { blocked_by: args.blocking_tasks })); // returnNewDocument not working...?
							}
						}
					);
				}
				else return reject(StandardError({ status: 404, title: 'OBJECT_NOT_FOUND' }));
			}
		});
	});
};