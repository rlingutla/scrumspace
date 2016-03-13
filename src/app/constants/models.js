import uuid from 'node-uuid';

export function projectDefault(){
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
		'gCommits':[],
		'color':'blue'
	}
}
