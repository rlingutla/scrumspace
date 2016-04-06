var database = require('../../database');
var readDocument = database.readDocument;

module.exports = function(project){
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
			}
			return obj;
		})
	});
}