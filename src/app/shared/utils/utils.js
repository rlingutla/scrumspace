import moment from 'moment';
import { search } from '../../mock_server/server';

//Projects
export function getCurrentSprint(props){
	// TODO get rid of this:
	var sprints = props.sprints || [];
	if(props.current_sprint === null) return null;

	else return sprints.find((sprint) => {
		return (sprint._id === props.current_sprint);
	});
}

//Date Time
export function verboseServerTime(serverTime) {
	return moment(serverTime).format('MMMM Do');
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
