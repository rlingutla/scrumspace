'use strict';

var database = require('../database');
var readDocument = database.readDocument;
var writeDocument = database.writeDocument;
var StandardError = require('../api/shared/StandardError');
var ObjectID = require('mongodb').ObjectID;

var _ = require('underscore');

module.exports.taskEnum = {
	UNASSIGNED: 'UNASSIGNED',
	DOING: 'DOING',
	BLOCKED: 'BLOCKED',
	DONE: 'DONE'
};

//Task
module.exports.update = function(args, db){
	return new Promise((resolve, reject) => {
		db.collection('tasks').findOne({_id: new ObjectID(args.task_id)}, (err, task) => {
			if(err || task === null) return reject(StandardError({ status: 404, title: 'OBJECT_NOT_FOUND' }));
			else {
				let updObject = { $set: {}};
				if(args.description) updObject.$set.description = args.description;
				if(args.status){
					//check if status is valid
					if(this.taskEnum[args.status]) {
						updObject.$set.status = args.status;
						//update history if status changed
						if(task.status !== args.status){
							updObject.$push = { history: { 
									from_status: task.status, 
									to_status: args.status, 
									modified_time: Date.now(), 
									modified_user: args.user
								}
							};
						}
					}
				}
				//if moving from blocked, remove blocking tasks
				if(task.status === 'BLOCKED' && args.status !== 'BLOCKED') updObject.$set.blocked_by = [];

				db.collection('tasks').findOneAndUpdate({_id: new ObjectID(args.task_id)}, updObject, { returnOriginal : false },
					(err, res) => {
						if(err) return reject(StandardError({ status: 500, title: 'IDK' }));
						else if(res.value === null) return reject(StandardError({ status: 404, title: 'OBJECT_NOT_FOUND' }));
						else return resolve(res.value);
					}
				);
			}
		});
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
						{ returnOriginal : false },
						(err, res) => {
							if(err) reject(err);
							else {
								if(res === null) return reject(StandardError({ status: 404, title: 'OBJECT_NOT_FOUND' }));
								// else return resolve(Object.assign({}, res.value, { assigned_to: args.users }));
								else return resolve(res.value);
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
		db.collection('tasks').find({ '_id': { $in: args.blocking_tasks.map((id) => new ObjectID(id)) }}).toArray((err, tasks) => {
			if(err) return reject(StandardError({ status: 404, title: 'OBJECT_NOT_FOUND' }));
			else {
				//all tasks found
				if(tasks.length === args.blocking_tasks.length){
					db.collection('tasks').findOneAndUpdate(
						{_id: new ObjectID(args.task_id)}, 
						{ $set: { 'blocked_by' : args.blocking_tasks} },
						{ returnOriginal : false },
						(err, res) => {
							if(err) reject(err);
							else {
								if(res === null) return reject(StandardError({ status: 404, title: 'OBJECT_NOT_FOUND' }));
								// else return resolve(Object.assign({}, res.value, { blocked_by: args.blocking_tasks })); // returnNewDocument not working...?
								else return resolve(res.value);
							}
						}
					);
				}
				else return reject(StandardError({ status: 404, title: 'OBJECT_NOT_FOUND' }));
			}
		});
	});
};