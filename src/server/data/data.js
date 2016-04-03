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
		'title': 'Facebook',
		'description': 'Build out web properties for minimally viable product',
		'users': [0],
		'status': 'sprint',
		'current_sprint': 0,
		'avatar': 'http://images.forbes.com/media/lists/companies/facebook_416x416.jpg',
		'sprints': [
			{
				'_id': 0,
				'name': 'V1 Release',
				'start_date': (new Date()).getTime(),
				'duration': 14,
				'scrum_time': '9:00 AM'
			}
		],
		'stories': [{
			'story_id': 'DT-S0',
			'title': '',
			'description': 'Design Hats \nOrder Hats\nSell Hats',
			'sprint_id': 0,
			'tasks': [
				{
				  '_id': 3,
				  'status': 'UNASSIGNED',
				  'assigned_to': [],
				  'blocked_by': [],
				  'description': 'Build out React',
				  'history': {
				    'elements': [
				      {
				        'fromStatus': null,
				        'toStatus': 'UNASSIGNED',
				        'modifiedTime': 1,
				        'modifiedUser': 0
				      }
				    ]
				  }
				}
		  ]
		}]
	}]
};

export default initialData;