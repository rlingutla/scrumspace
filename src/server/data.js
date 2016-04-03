
const xDaysAgoInUnixTime = (x) => {
	return Date.now() - 1000* 60 * 60 * 24 * x;
};

var initialData = {
	loading: false,
	users: {
		0: {
			'_id': 0,
			'first_name': 'John',
			'last_name': 'Vilk',
			'email': 'jvilk@umass.edu',
			'display_name': 'VilkBot',
			'password': 'catinthehat',
			'avatar_url': 'https://avatars0.githubusercontent.com/u/1141042?v=3&s=460'
		},
		1: {
			'_id': 1,
			'first_name': 'Abhay',
			'last_name': 'Vatsa',
			'email': 'someemail',
			'display_name': 'Abhay Vatsa',
			'password': 'd4866854120e8bb207d6f8e11fce8b99',
			'avatar_url': 'http://www.abhayvatsa.com/img/abhay.png'
		},
		2: {
			'_id': 2,
			'first_name': 'Dylan',
			'last_name': 'Fischler',
			'email': 'someemail',
			'display_name': 'Dylan Fischler',
			'password': 'd4866854120e8bb207d6f8e11fce8b99',
			'avatar_url': 'http://www.dylanfischler.com/includes/me_bw.jpg'
		},
		3: {
			'_id': 3,
			'first_name': 'Niha',
			'last_name': 'Venkatathri',
			'email': 'someemail',
			'display_name': 'Niha Venkatathri',
			'password': 'd4866854120e8bb207d6f8e11fce8b99',
			'avatar_url': 'http://umasscswomen.weebly.com/uploads/3/8/0/8/38087803/3410479.jpg?153'
		},
		4: {
			'_id': 4,
			'first_name': 'Ryan',
			'last_name': 'Jerue',
			'email': 'someemail',
			'display_name': 'Ryan Jerue',
			'password': 'd4866854120e8bb207d6f8e11fce8b99',
			'avatar_url': 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAa7AAAAJGQ2NjlmY2MzLTgzYjctNGRhYy05ZmY2LTkxOGE3Mzg2NWU2MA.jpg'
		},
		5: {
			'_id': 5,
			'first_name': 'Supriya',
			'last_name': 'Kankure',
			'email': 'someemail',
			'display_name': 'Supriya Kankure',
			'password': 'd4866854120e8bb207d6f8e11fce8b99',
			'avatar_url': 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAa1AAAAJDRjMTU3ZTA2LTFkMTEtNDM1MS04YjQ0LWI0YzRlOTExODQ3NA.jpg'
		},
		6: {
			'_id': 6,
			'first_name': 'Rachana',
			'last_name': 'Lingutla',
			'email': 'someemail',
			'display_name': 'Rachana Lingutla',
			'password': 'd4866854120e8bb207d6f8e11fce8b99',
			'avatar_url': 'https://avatars.slack-edge.com/2016-02-07/20575719908_a1012b8fe4efe81099c3_72.png'
		}
	},
	projects: [
	{
		'_id': 0,
		'title': 'Drumpf',
		'description': 'Make America Great Again',
		'users': [0, 1],
		'status': 'sprint',
		'current_sprint': 0,
		'avatar': 'http://static1.businessinsider.com/image/55ca4540371d22462c8bcb17/donald-trump-is-still-soaring-in-iowa--but-there-are-now-some-clear-warning-signs.jpg',
		'sprints': [
			{
				'_id': 0,
				'name': 'V1 Release',
				'start_date': (new Date()).getTime(),
				'duration': 14,
				'scrum_time': '9:00 AM'
			},
			{
				'_id': 1,
				'name': 'V2 Release',
				'duration': 7,
				'start_date': null,
				'scrum_time': '9:00 AM'
			}
		],
		'stories': [
			{
				'_id': 'DT-S0',
				'title': 'Buy Hats',
				'description': 'Design Hats \nOrder Hats\nSell Hats',
				'sprint_id': 0,
				'tasks': [
					{
						'_id': 0,
						'status': 'UNASSIGNED',
						'blocked_by': [],
						'assigned_to': [
							{
								'_id': 0,
								'first_name': 'John',
								'last_name': 'Vilk',
								'email': 'jvilk@umass.edu',
								'display_name': 'VilkBot',
								'password': 'catinthehat',
								'avatar_url': 'https://avatars0.githubusercontent.com/u/1141042?v=3&s=460'
							},
							{
								'_id': 1,
								'first_name': 'Abhay',
								'last_name': 'Vatsa',
								'email': 'someemail',
								'display_name': 'Abhay Vatsa',
								'password': 'd4866854120e8bb207d6f8e11fce8b99',
								'avatar_url': 'http://www.abhayvatsa.com/img/abhay.png'
							}
						],
						'description': 'Find a Designer',
						'history': [{
							from_status: null,
							to_status: 'UNASSIGNED',
							modified_time: xDaysAgoInUnixTime(2),
							modified_user : 0
						}],
						'attachments': null
					},
					{
						'_id': 1,
						'status': 'UNASSIGNED',
						'blocked_by': [],
						'assigned_to': [],
						'description': 'Make Mexico pay for it',
						'history': [{
							from_status: null,
							to_status: 'UNASSIGNED',
							modified_time: xDaysAgoInUnixTime(4),
							modified_user : 0
						}],
						'attachments': null
					},
					{
						'_id': 2,
						'status': 'DONE',
						'blocked_by': [],
						'assigned_to': [
							{
								'_id': 0,
								'first_name': 'John',
								'last_name': 'Vilk',
								'email': 'jvilk@umass.edu',
								'display_name': 'VilkBot',
								'password': 'catinthehat',
								'avatar_url': 'https://avatars0.githubusercontent.com/u/1141042?v=3&s=460'
							}
						],
						'description': 'Make Donald Drumpf again',
						'history': [{
							from_status: 'UNASSIGNED',
							to_status: 'BLOCKED',
							modified_time: xDaysAgoInUnixTime(2),
							modified_user : 0
						},{
							from_status: null,
							to_status: 'UNASSIGNED',
							modified_time: xDaysAgoInUnixTime(1),
							modified_user : 0
						}],
						'attachments': null
					},
					{
						'_id': 3,
						'status': 'DONE',
						'blocked_by': [],
						'assigned_to': [],
						'description': 'Replace Donald\'s Toupee',
						'history': [{
							from_status: 'DOING',
							to_status: 'DONE',
							modified_time: xDaysAgoInUnixTime(1),
							modified_user : 0
						},{
							from_status: 'UNASSIGNED',
							to_status: 'DOING',
							modified_time: xDaysAgoInUnixTime(3),
							modified_user : 0
						},{
							from_status: null,
							to_status: 'UNASSIGNED',
							modified_time: xDaysAgoInUnixTime(5),
							modified_user : 0
						}],
						'attachments': null
					}
				]
			},
			{
				'_id': 'DT-S1',
				'title': 'Win',
				'description': 'Win Win Win\nNo matter what',
				'sprint_id': 0,
				'tasks': [
					{
						'_id': 0,
						'status': 'UNASSIGNED',
						'blocked_by': [],
						'assigned_to': [
							{
								'_id': 0,
								'first_name': 'John',
								'last_name': 'Vilk',
								'email': 'jvilk@umass.edu',
								'display_name': 'VilkBot',
								'password': 'catinthehat',
								'avatar_url': 'https://avatars0.githubusercontent.com/u/1141042?v=3&s=460'
							}
						],
						'description': 'Beat hilldawg',
						'history': [{
							from_status: null,
							to_status: 'UNASSIGNED',
							modified_time: xDaysAgoInUnixTime(3),
							modified_user : 0
						}],
						'attachments': null
					}
				]
			}
		],
		'commits': [3,1,6,4,8],
		'timeFrame':['Mon','Tues','Wed','Thurs','Fri'],
		'membersOnProj':['Dylan', 'Abhay', 'Ryan','DJ Trump','Supriya','Niha'],
		'gCommits': [12,10,4,6,5,6],
		'color':'#'+Math.floor(Math.random()*16777215).toString(16)

	},
	{
		'_id': 1,
		'title': 'Feel the Bern',
		'description': 'Fight the Power',
		'users': [0],
		'status': 'planning',
		'current_sprint': null,
		'avatar': 'http://www.slate.com/content/dam/slate/articles/news_and_politics/politics/2015/07/150706_POL_Sanders.jpg.CROP.promo-xlarge2.jpg',
		'sprints': [],
		'stories': [],
		'commits':[4,7,2,8,9],
		'timeFrame':['Mon','Tues','Wed','Thurs','Fri'],
		'membersOnProj':['Dylan', 'Abhay', 'Ryan','DJ Trump','Supriya','Niha'],
		'gCommits':[18,15,6,9,11,13],
		'color':'#'+Math.floor(Math.random()*16777215).toString(16)

	}
	]
};

module.exports = initialData;
