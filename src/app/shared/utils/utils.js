import moment from 'moment';

//Projects
/*
** props is a project object
*/
export function getCurrentSprint(props){
	// TODO get rid of this:
	var sprints = props.sprints || [];
	if(props.current_sprint === null) return null;

	else return sprints.find((sprint) => {
		return (sprint._id === props.current_sprint);
	});
}

/*
** props is a project object
*/
export function getCurrentTasks(props){
	let currentSprint = getCurrentSprint(props), tasks = [];
	if(!currentSprint) return tasks;
	
	//extract all tasks from active stories
	props.stories.forEach((story) => {
		//a current story
		if(story.sprint_id == currentSprint._id) tasks = [...tasks, ...story.tasks]
	});
	return tasks;
}

//Date Time
export function verboseServerTime(serverTime) {
	return moment(serverTime).format('MMMM Do');
}

//TODO
export function daysDifference(startDate, endDate){
	var start = moment(startDate), end = moment(endDate);
	var days = moment.duration(end.diff(start)).asDays();

	var isAfter = start.isAfter(end);
	debugger;

	return {
		days: Math.round(days),
		past: start.isAfter(end)
	};
}

export function populateProjectEntities(project){
	//TODO see if we can do this more efficiently
	let users ={}, tasks = {};

	project.users.forEach((user) => users[user._id] = user)

	//build references
	project.stories.forEach((story) => {
		tasks[story._id] = {};
		story.tasks.forEach((task) => {
			tasks[task._id] = task;
		});
	});

	let stories = project.stories.map((story) => {
		return Object.assign({}, story, { tasks: story.tasks.map((task) => {
			let assigned = task.assigned_to.map((userID) => users[userID]);
			let blocked = task.blocked_by.map((taskID) => tasks[taskID]);
			return Object.assign({}, task, {
				assigned_to: assigned,
				blocked_by: blocked
			});
		})});
	});

	return Object.assign({}, project, {stories});
};