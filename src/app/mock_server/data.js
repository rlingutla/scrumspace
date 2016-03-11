var initialData = {
	loading: false,
	users: {
		0: {
	'_id': 0,
	'first_name': 'Donald',
	'last_name': 'Trump',
	'email': 'america@donaldjtrump.com',
	'display_name': 'DJ Trump',
	'password': 'd4866854120e8bb207d6f8e11fce8b99'
		}
	},
	projects: [
	{
		'_id': 0,
		'title': 'Drumpf',
		'description': 'Make America Great Again',
		'users': ['rachana', 'supriya'],
		'status': 'sprint',
		'current_sprint': 0,
		'avatar': 'http://static1.businessinsider.com/image/55ca4540371d22462c8bcb17/donald-trump-is-still-soaring-in-iowa--but-there-are-now-some-clear-warning-signs.jpg',
		'sprints': [
			{
				'_id': 0,
				'start_date': 1456900811760,
				'end_date': 1456900811760,
				'scrum_time': '9:00 AM'
			}
		],
		'stories': [
			{
				'_id': 0,
				'title': 'Buy Hats',
				'description': 'Design Hats \nOrder Hats\nSell Hats',
				'sprint_id': 0,
				'tasks': [
					{
						'_id': 0,
						'status': 'UNASSIGNED',
						'description': 'Find a Designer',
						'history': null,
						'attachments': null
					},
					{
						'_id': 1,
						'status': 'UNASSIGNED',
						'description': 'Make Mexico pay for it',
						'history': null,
						'attachments': null
					},
					{
						'_id': 2,
						'status': 'BLOCKED',
						'description': 'Make Donald Drumpf again',
						'history': null,
						'attachments': null
					},
					{
						'_id': 3,
						'status': 'DONE',
						'description': 'Replace Donald\'s Toupee',
						'history': null,
						'attachments': null
					}
				]
			}
		]
	},
	{
		'_id': 1,
		'title': 'Feel the Bern',
		'description': 'Fight the Power',
		'users': [0],
		'status': 'planning',
		'current_sprint': null,
		'avatar': 'http://www.slate.com/content/dam/slate/articles/news_and_politics/politics/2015/07/150706_POL_Sanders.jpg.CROP.promo-xlarge2.jpg',
		'sprints': {},
		'stories': []
	}
	]
};

export default initialData;
