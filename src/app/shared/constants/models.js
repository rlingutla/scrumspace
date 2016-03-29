import uuid from 'node-uuid';

export function project(){
	return {
		'_id': uuid.v1(),
		'title': 'Project',
		'description': 'This is my Project',
		'users': [],
		'status': 'planning',
		'current_sprint': null,
		'avatar': '',
		'sprints': [],
		'stories': [],
		'commits':[],
		'timeFrame':['Mon','Tues','Wed','Thurs','Fri'],
		'membersOnProj':['Dylan', 'Abhay', 'Ryan','DJ Trump','Supriya','Niha'],
		'gCommits':[],
		'color':'blue'
	}
}

export function story(){
	return {
		'_id': 'DT-S0', //Unique ID 
		'title': '', // String
		'description': '', // String
		'sprint_id': 0, // FK to Sprint
		'tasks': [] // Array of Task objects
	}
}

export const taskTypes = ['UNASSIGNED', 'DOING', 'BLOCKED', 'DONE'];

export function task(){
	return {
		'_id': '',
		'status': 'UNASSIGNED', // Enum TaskTypes
		'assignedTo': [], // Array of user FK
		'description': '', // String 
		'history': [], // Array of taskHistory objects
		'attachments': null
	}
}

export function taskHistory(){
	return {
		fromStatus: null, //null or TaskTypes
		toStatus: 'UNASSIGNED', //TaskTypes
		modifiedTime: xDaysAgoInUnixTime(5), // time of history entry
		modifiedUser: 0 // user FK
	}
}

export function sprint(){
	return {
		'_id': uuid.v1(), // Unique ID
		'name': '', // String
		'start_date': (new Date()).getTime(), // Datetime defined when sprint starts
		'duration': 14, // Integer
		'scrum_time': '9:00 AM' // String (for now)
	}
}

export function user(){
	return {
		'_id': uuid.v1(), // Unique ID
		'first_name': '', // String
		'last_name': '', // String
		'email': '', // String
		'display_name': '', // String
		'password': '', // IDK
		'avatar_url': '' // URL
	}
}
