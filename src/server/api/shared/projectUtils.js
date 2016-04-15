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

const pack = (users, projects, stories, sprints, tasks) => {

	// build ref object
	let ref = { stories: {}, sprints: {}, tasks: {} };

	let userRef = {};
	users.forEach((user) => userRef[user._id] = user);

	stories.forEach((story) => {
		(ref.stories[story.project_id]) ? 
		ref.stories[story.project_id].push(story):
		(ref.stories[story.project_id] = Array(1).fill(story));
	});

	sprints.forEach((sprint) => {
		(ref.sprints[sprint.project_id]) ? 
		ref.sprints[sprint.project_id].push(sprint):
		(ref.sprints[sprint.project_id] = Array(1).fill(sprint));
	});

	tasks.forEach((task) => {
		(ref.tasks[task.project_id]) ? 
		ref.tasks[task.project_id].push(task):
		(ref.tasks[task.project_id] = Array(1).fill(task));
	});

	return projects.map((project) => {
		//embed users
		project.users = project.users.map((id) => {
			var obj = {
				'_id': userRef[id]._id,
				'first_name': userRef[id].first_name,
				'last_name': userRef[id].last_name,
				'email': userRef[id].email,
				'display_name': userRef[id].display_name,
				'avatar_url': userRef[id].avatar_url
			};
			return obj;
		});
		//map project sprints to project object
		project.sprints = ref.sprints[project._id] || [];
		//if stories exist for project, map to project object
		if(!ref.stories[project._id]) project.stories = [];
		else {
			//if tasks exist on project, map to story object
			projects.stories = ref.stories[project._id].map((story) => {
				if(!ref.tasks[project._id]) story.tasks = [];
				else story.tasks = ref.tasks[project._id].filter((task) => task.story_id === story._id);
			});
		}

		return project;
	});
};

export const packageProjects = (user_id, db) => {
	return new Promise((resolve, reject) => {
		db.collection('users').find({}).toArray((err, users) => {
			if(err) reject(err);
			else {
				db.collection('projects').find({}).toArray((err, projects) => {
					if(err) reject(err);
					else {
						var projectIDs = projects.map((project) => project._id);

						// get all objects in needed projects
						db.collection('stories').find({ project_id: { $in: projectIDs } }).toArray((err, stories) => {
							if(err) reject(err);
							else {
								db.collection('sprints').find({ project_id: { $in: projectIDs } }).toArray((err, sprints) => {
									if(err) reject(err);
									else {
										db.collection('tasks').find({ project_id: { $in: projectIDs } }).toArray((err, tasks) => {
											if(err) reject(err);
											else resolve(pack(users, projects, stories, sprints, tasks));
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
