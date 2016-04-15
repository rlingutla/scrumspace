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

export const packageProjects = (user_id, db) => {
	db.collection('projects').find({}).toArray((err, projects) => {
		if(err){
			console.log(`Database Error: ${err}`);
			console.log(false);
		} else {
			console.log(projects);
		}
	});




	// .then((projects) => {
	// 	console.log("projects", projects);
	// },
	// (err) => {
	// 	console.log(`Database Error: ${err}`);
	// 	console.log(false);
	// });
};
