'use strict';

var database = require('../database');
var readDocument = database.readDocument;
var writeDocument = database.writeDocument;
var StandardError = require('../api/shared/StandardError');

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
}

module.exports.assignUser = function(args){
	let project = readDocument('projects', args.project_id);
	let updatedTask, updatedProject;

	return new Promise((resolve, reject) => {
		updatedProject = Object.assign({}, project, { stories: project.stories.map((story) => {
			if(story._id === args.story_id){
				return Object.assign({}, story, { tasks: story.tasks.map((task) => {
					if(task._id === args.task_id){
						updatedTask = Object.assign({}, task, {
							history: [
								...task.history //TODO do history stuff
							],
							assigned_to: _.union(task.assigned_to, args.users)
						});
						return updatedTask;
					} else return task;
				})});
			} else return story;
		})});

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
}


module.exports.assignBlocking = function(args){
	let project = readDocument('projects', args.project_id);
	let updatedTask, updatedProject;

	return new Promise((resolve, reject) => {
		updatedProject = Object.assign({}, project, { stories: project.stories.map((story) => {
			if(story._id === args.story_id){
				return Object.assign({}, story, { tasks: story.tasks.map((task) => {
					if(task._id === args.task_id){
						updatedTask = Object.assign({}, task, {
							history: [
								...task.history //TODO do history stuff
							],
							blocked_by: _.union(task.blocked_by, args.blocking_tasks)
						});
						return updatedTask;
					} else return task;
				})});
			}
			else return story;
		})});

		console.log("updatedProject", updatedProject);

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
}