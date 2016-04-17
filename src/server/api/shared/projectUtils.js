var database = require('../../database');
var readDocument = database.readDocument;

var ObjectID = require('mongodb').ObjectID;

export const embedUsers = (project) => {
	var userId = 0;
	var users = readDocument('users');
	return Object.assign({}, project, {
		//map userIDs to user objects

		users: project.users.map((id) => {
			var obj = {
				'_id': users[id]._id,
				'first_name': users[id].first_name,
				'last_name': users[id].last_name,
				'email': users[id].email,
				'display_name': users[id].display_name,
				'avatar_url': users[id].avatar_url
			};
			return obj;
		})
	});
};

const pack = (data, refs) => {

	let users = {}, stories = {}, sprints = {}, tasks = {};
	//convert arrays to _id keyed dicts
	data.users.forEach((user) => users[user._id] = user);
	data.stories.forEach((story) => stories[story._id] = story);
	data.sprints.forEach((sprint) => sprints[sprint._id] = sprint);
	data.tasks.forEach((task) => tasks[task._id] = task);

	return data.projects.map((project) => {
		//embed users
		project.users = project.users.map((id) => {
			var obj = {
				'_id': users[id]._id,
				'first_name': users[id].first_name,
				'last_name': users[id].last_name,
				'email': users[id].email,
				'display_name': users[id].display_name,
				'avatar_url': users[id].avatar_url
			};
			return obj;
		});
		
		project.sprints = refs.sprintIDs.project[project._id].map((id) => sprints[id]);
		project.stories = refs.storyIDs.project[project._id].map((id) => {
			let story = stories[id];
			return Object.assign({}, story, { tasks: refs.taskIDs.story[story._id].map((task_id) => tasks[task_id]) });
		});

		return project;
	});
};

export const packageProjects = (user_id, db) => {
	return new Promise((resolve, reject) => {
		db.collection('users').find({}).toArray((err, users) => {
			if(err) reject(err);
			else {
				db.collection('projects').find({ users: { $in: [new ObjectID(user_id)] } }).toArray((err, projects) => {
					if(err) reject(err);
					else {
						//grab all sub-entity IDs to pull from DB
						var projectIDs = [];
						var sprintIDs = { all: [], project: {} }, storyIDs = { all: [], project: {} };
						projects.forEach((project) => {
							projectIDs.push(project._id);

							sprintIDs.all.push(...project.sprints);
							sprintIDs.project[project._id] = project.sprints;

							storyIDs.all.push(...project.stories);
							storyIDs.project[project._id] = project.stories;
						});

						db.collection('stories').find({ _id: { $in: storyIDs.all } }).toArray((err, stories) => {
							if(err) reject(err);

							else {
								var taskIDs = { all: [], story: {} };
								stories.forEach((story) => {
									// build task reference array
									taskIDs.all.push(...story.tasks);
									taskIDs.story[story._id] = story.tasks;
								});

								db.collection('sprints').find({ _id: { $in: sprintIDs.all } }).toArray((err, sprints) => {
									if(err) reject(err);
									else {
										db.collection('tasks').find({ _id: { $in: taskIDs.all } }).toArray((err, tasks) => {
											if(err) reject(err);
											else {
												let data = { users, projects, stories, sprints, tasks };
												let refs = { projectIDs, sprintIDs, storyIDs, taskIDs };
												resolve(pack(data, refs));
											}
										});
									}
								});
							}
						});
					}
				});
			}
		});	
	});
};
