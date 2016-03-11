import moment from 'moment';

//Projects
export function getCurrentSprint(props){
	return props.sprints[props.current_sprint];
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
		past: start > end
	}
}