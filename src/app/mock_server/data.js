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
	projects: {
		0: {
	'_id': 0,
	'title': 'Drumpf',
	'description': 'Make America Great Again',
	'users': [0],
	'status': 'sprint',
	'current_sprint': 0,
	'sprints': {
				0: {
			'_id': 0,
			'start_date': 1456900811760,
			'end_date': 1456900811760,
			'scrum_time': '9:00 AM'
				}
			},
	'stories': {
				0: {
			'_id': 0,
			'title': 'Buy Hats',
			'description': 'Design Hats \nOrder Hats\nSell Hats',
			'sprint_id': 0,
			'tasks': [
						{
					'_id': 0,
					'status': 'DOING',
					'description': 'Contact Graphic Designer',
					'history': null,
					'attachments': null
						}
					]
				}
			}
		},
		1: {
	'_id': 1,
	'title': 'Feel the Bern',
	'description': 'Fight the Power',
	'users': [0],
	'status': 'planning',
	'current_sprint': null,
	'sprints': {},
	'stories': {}
		}
	}
};

export default initialData;