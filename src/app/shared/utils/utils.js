import moment from 'moment';


function verboseServerTime(serverTime) {
	return serverTime;
}

function daysDifference(startDate, endDate){
	var start = moment(startDate);
	var end = moment(endDate);
	var duration = moment.duration(start.diff(end));
	var days = duration.asDays();
	console.log("days", days);
}

let utils = {
	verboseServerTime: verboseServerTime,
	daysDifference: daysDifference
};

export default utils;
