// Put the initial mock objects here.

var ObjectID = require('mongodb').ObjectID;
const xDaysAgoInUnixTime = (x) => {
	return Date.now() - 1000* 60 * 60 * 24 * x;
};

module.exports =  {
	users: {
		0: {
			'_id': new ObjectID('000000000000000000000000'),
			'first_name': 'John',
			'last_name': 'Vilk',
			'email': 'jvilk@cs.umass.edu',
			'display_name': 'VilkBot',
			'password': 'javascript',
			'avatar_url': 'https://avatars0.githubusercontent.com/u/1141042?v=3&s=460'
		},
		1: {
			'_id': new ObjectID('000000000000000000000001'),
			'first_name': 'Abhay',
			'last_name': 'Vatsa',
			'email': 'atvatsa@gmail.com',
			'display_name': 'vatsaumass',
			'password': 'password',
			'avatar_url': 'http://www.abhayvatsa.com/img/abhay.png'
		},
		2: {
			'_id': new ObjectID('000000000000000000000002'),
			'first_name': 'Dylan',
			'last_name': 'Fischler',
			'email': 'dylanfischler@gmail.com',
			'display_name': 'Dylan Fischler',
			'password': 'password',
			'avatar_url': 'http://www.dylanfischler.com/includes/me_bw.jpg'
		},
		3: {
			'_id': new ObjectID('000000000000000000000003'),
			'first_name': 'Niha',
			'last_name': 'Venkatathri',
			'email': 'someemail',
			'display_name': 'Niha Venkatathri',
			'password': 'd4866854120e8bb207d6f8e11fce8b99',
			'avatar_url': 'http://umasscswomen.weebly.com/uploads/3/8/0/8/38087803/3410479.jpg?153'
		},
		4: {
			'_id': new ObjectID('000000000000000000000004'),
			'first_name': 'Ryan',
			'last_name': 'Jerue',
			'email': 'ryan@ryan.com',
			'display_name': 'Ryan Jerue',
			'password': 'ryan',
			'avatar_url': 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAa7AAAAJGQ2NjlmY2MzLTgzYjctNGRhYy05ZmY2LTkxOGE3Mzg2NWU2MA.jpg'
		},
		5: {
			'_id': new ObjectID('000000000000000000000005'),
			'first_name': 'Supriya',
			'last_name': 'Kankure',
			'email': 'someemail',
			'display_name': 'Supriya Kankure',
			'password': 'd4866854120e8bb207d6f8e11fce8b99',
			'avatar_url': 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAa1AAAAJDRjMTU3ZTA2LTFkMTEtNDM1MS04YjQ0LWI0YzRlOTExODQ3NA.jpg'
		},
		6: {
			'_id': new ObjectID('000000000000000000000006'),
			'first_name': 'Rachana',
			'last_name': 'Lingutla',
			'email': 'someemail',
			'display_name': 'Rachana Lingutla',
			'password': 'd4866854120e8bb207d6f8e11fce8b99',
			'avatar_url': 'https://avatars.slack-edge.com/2016-02-07/20575719908_a1012b8fe4efe81099c3_72.png'
		}
	},
	'sprints': [
		{
			'_id': new ObjectID('000000000000000000000000'),
			'name': 'V1 Release',
			'start_date': xDaysAgoInUnixTime(3),
			'duration': 14,
			'scrum_time': '09:00'
		},
		{
			'_id': new ObjectID('000000000000000000000001'),
			'name': 'V2 Release',
			'duration': 7,
			'start_date': null,
			'scrum_time': '09:00'
		}
	],
	'tasks': [
		{
			'_id': new ObjectID('000000000000000000000000'),
			'status': 'UNASSIGNED',
			'blocked_by': [],
			'assigned_to': [],
			'description': 'Project Image Upload',
			'history': [],
			'attachments': null
		},
		{
			'_id': new ObjectID('000000000000000000000001'),
			'status': 'UNASSIGNED',
			'blocked_by': [],
			'assigned_to': [],
			'description': 'Improve react-select component styling',
			'history': [],
			'attachments': null
		},
		{
			'_id': new ObjectID('000000000000000000000002'),
			'status': 'UNASSIGNED',
			'blocked_by': [],
			'assigned_to': [],
			'description': 'Need to handle "owner" of project, give them permanent access',
			'history': [],
			'attachments': null
		},
		{
			'_id': new ObjectID('000000000000000000000003'),
			'status': 'UNASSIGNED',
			'blocked_by': [],
			'assigned_to': [],
			'description': 'User Images should show up in select boxes',
			'history': [],
			'attachments': null
		},
		{
			'_id': new ObjectID('000000000000000000000004'),
			'status': 'UNASSIGNED',
			'blocked_by': [],
			'assigned_to': [],
			'description': 'Design replication mechanism with mongo',
			'history': [],
			'attachments': null
		},
		{
			'_id': new ObjectID('000000000000000000000005'),
			'status': 'UNASSIGNED',
			'blocked_by': [],
			'assigned_to': [],
			'description': 'Provide Preview of application on homepage',
			'history': [],
			'attachments': null
		},
		{
			'_id': new ObjectID('000000000000000000000006'),
			'status': 'UNASSIGNED',
			'blocked_by': [],
			'assigned_to': [],
			'description': 'Design HTTP routes for registration',
			'history': [],
			'attachments': null
		},
		{
			'_id': new ObjectID('000000000000000000000007'),
			'status': 'UNASSIGNED',
			'blocked_by': [],
			'assigned_to': [],
			'description': 'Design user registration form',
			'history': [],
			'attachments': null
		}
	],
	'stories': [
		{
			'_id': new ObjectID('000000000000000000000000'),
			'title': 'Users can\'t personalize their project page',
			'description': 'Design components needed for personalizing projects',
			'sprint_id': new ObjectID('000000000000000000000000'),
			'tasks': [new ObjectID('000000000000000000000000'), new ObjectID('000000000000000000000001'), new ObjectID('000000000000000000000002'), new ObjectID('000000000000000000000003')]
		},
		{
			'_id': new ObjectID('000000000000000000000001'),
			'title': 'User data is not replicated anywhere.',
			'description': 'Need to develop mechanism for keeping multiple copies of data to enable recovery',
			'sprint_id': new ObjectID('000000000000000000000000'),
			'tasks': [new ObjectID('000000000000000000000004')]
		},
		{
			'_id': new ObjectID('000000000000000000000002'),
			'title': 'Users cannot register for ScrumSpace',
			'description': 'Blocking feature to beat Atlassian',
			'sprint_id': new ObjectID('000000000000000000000000'),
			'tasks': [new ObjectID('000000000000000000000005'), new ObjectID('000000000000000000000006'), new ObjectID('000000000000000000000007')]
		}


	],
	'projects': [
		{
			'_id': new ObjectID('000000000000000000000000'),
			'title': 'ScrumSpace',
			'description': 'From the whiteboard to the web.',
			'users': [new ObjectID('000000000000000000000000'), new ObjectID('000000000000000000000001'), new ObjectID('000000000000000000000002'),  new ObjectID('000000000000000000000006'),  new ObjectID('000000000000000000000004')],
			'status': 'sprint',
			'current_sprint': new ObjectID('000000000000000000000000'),
			'sprints': [new ObjectID('000000000000000000000000'), new ObjectID('000000000000000000000001')],
			'stories': [new ObjectID('000000000000000000000000'), new ObjectID('000000000000000000000001'),new ObjectID('000000000000000000000002')],
			'avatar': 'https://www.mountaingoatsoftware.com/uploads/articles/LabelledTaskBoard.jpg',
			'githubRepo': 'rjerue',
			'githubOwner': 'Anagram-Finder',
			'stats':{
				'allStats':[4,6,2,1,7,5,9,10,3,6],
				'timeFrame':['1','2','3','4','5','6','7','8','9','10'],
				'color':'#'+Math.floor(Math.random()*16777215).toString(16)
			}
		},
		{
			'_id': new ObjectID('000000000000000000000001'),
			'title': 'Social Media Network',
			'description': 'Develop mock facebook application',
			'users': [new ObjectID('000000000000000000000000')],
			'status': 'planning',
			'current_sprint': null,
			'sprints': [],
			'stories': [],
			'avatar': 'https://www.wpi.edu/Images/CMS/ComputerScience/cs-student-vilk-lg.jpg',
			'githubRepo': 'rlingutla',
      'githubOwner': 'ForestTycoon-HampHack-2016-',
			'stats':{
				'allStats':[3,1,6,4,8,7,9,1,12,6],
				'timeFrame':['1','2','3','4','5','6','7','8','9','10'],
				'color':'#'+Math.floor(Math.random()*16777215).toString(16)
			}

		}
	]
};
