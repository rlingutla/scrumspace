var database = require('../../database');
var readDocument = database.readDocument;
var writeDocument = database.writeDocument;

// can receive first level prop updates
function updateTask(project_id, story_id, changedTask){
	let projects = readDocument('projects');
	let updatedTask, updatedProject;

	projects.map((project) => {
		if(project._id === project_id){
			updatedProject = Object.assign({}, project, { stories: project.stories.map((story) => {
				if(story._id === story_id){
					return Object.assign({}, story, { tasks: story.tasks.map((task) => {
						if(task._id === changedTask._id){
							let historyItem = { from_status: task.status, to_status: changedTask.status, modified_time: Date.now(), modified_user: getCurrentUser()};

							updatedTask = Object.assign({}, task, changedTask, {
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


	//write updated project object to server
	writeDocument('projects', updatedProject);

	serverLog('DB Updated', updatedTask);

	return emulateServerReturn(updatedTask, updatedTask === undefined);
}

module.exports.updateTask = updateTask;