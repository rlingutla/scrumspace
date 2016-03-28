import moment from 'moment';
import { search } from '../../mock_server/server';

//Projects
/*
** props is a project object
*/
export function getCurrentSprint(props){
	if(props.current_sprint === null) return null;

	else return props.sprints.find((sprint) => {
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
	return moment(serverTime).format("MMMM Do");
}

//TODO
export function daysDifference(startDate, endDate){
	var start = moment(startDate), end = moment(endDate);
	var days = moment.duration(end.diff(start)).asDays();
	return {
		days: Math.round(days),
		past: start > end //does this make sense...?
	};
}

// FOR SERVER SIDE SEARCHING LATER
// export function search(str, collection, key, limit){
// 	//TODO
// 	return search(str, collection, key, limit);
// }
