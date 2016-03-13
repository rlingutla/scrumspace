
const xDaysAgoInUnixTime = (x) => {
	return Date.now() - 1000* 60 * 60 * 24 * x;
};

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
		'users': [
			{
				'_id': 0,
				'first_name': 'Donald',
				'last_name': 'Trump',
				'email': 'america@donaldjtrump.com',
				'display_name': 'DJ Trump',
				'password': 'd4866854120e8bb207d6f8e11fce8b99'
			}
		],

		'status': 'sprint',
		'current_sprint': 0,
		'avatar': 'http://static1.businessinsider.com/image/55ca4540371d22462c8bcb17/donald-trump-is-still-soaring-in-iowa--but-there-are-now-some-clear-warning-signs.jpg',
		'sprints': [
			{
				'_id': 0,
				'name': 'V2 Release',
				'start_date': 1456900811760,
				'end_date': 1458925200000,
				'scrum_time': '9:00 AM'
			},
			{
				'_id': 1,
				'name': 'V1 Release',
				'start_date': 1456900811760,
				'end_date': 1456900811800,
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
						'assignedTo': 0,
						'description': 'Find a Designer',
						'history': [{
							fromStatus: null,
							toStatus: 'UNASSIGNED',
							modifiedTime: xDaysAgoInUnixTime(5),
							modifiedUser : 0
						}],
						'attachments': null
					},
					{
						'_id': 1,
						'status': 'UNASSIGNED',
						'assignedTo': 0,
						'description': 'Make Mexico pay for it',
						'history': [{
							fromStatus: null,
							toStatus: 'UNASSIGNED',
							modifiedTime: xDaysAgoInUnixTime(5),
							modifiedUser : 0
						}],
						'attachments': null
					},
					{
						'_id': 2,
						'status': 'BLOCKED',
						'assignedTo': 0,
						'description': 'Make Donald Drumpf again',
						'history': [{
							fromStatus: 'UNASSIGNED',
							toStatus: 'BLOCKED',
							modifiedTime: xDaysAgoInUnixTime(2),
							modifiedUser : 0
						},{
							fromStatus: null,
							toStatus: 'UNASSIGNED',
							modifiedTime: xDaysAgoInUnixTime(5),
							modifiedUser : 0
						}],
						'attachments': null
					},
					{
						'_id': 3,
						'status': 'DONE',
						'description': 'Replace Donald\'s Toupee',
						'history': [{
							fromStatus: 'DOING',
							toStatus: 'DONE',
							modifiedTime: xDaysAgoInUnixTime(1),
							modifiedUser : 0
						},{
							fromStatus: 'UNASSIGNED',
							toStatus: 'DOING',
							modifiedTime: xDaysAgoInUnixTime(3),
							modifiedUser : 0
						},{
							fromStatus: null,
							toStatus: 'UNASSIGNED',
							modifiedTime: xDaysAgoInUnixTime(5),
							modifiedUser : 0
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
						'assignedTo': 0,
						'description': 'Beat hilldawg',
						'history': [{
							fromStatus: null,
							toStatus: 'UNASSIGNED',
							modifiedTime: xDaysAgoInUnixTime(5),
							modifiedUser : 0
						}],
						'attachments': null
					}
				]
			}
		],
		'commits':[3,1,6,4,8],
		'gCommits':[12,10,4,6,5],
		'color':'#'+Math.floor(Math.random()*16777215).toString(16)
	},
	{
		'_id': 1,
		'title': 'Feel the Bern',
		'description': 'Fight the Power',
		'users': [
			{
				'_id': 0,
				'first_name': 'Donald',
				'last_name': 'Trump',
				'email': 'america@donaldjtrump.com',
				'display_name': 'DJ Trump',
				'password': 'd4866854120e8bb207d6f8e11fce8b99'
			}
		],
		'status': 'planning',
		'current_sprint': null,
		'avatar': 'http://www.slate.com/content/dam/slate/articles/news_and_politics/politics/2015/07/150706_POL_Sanders.jpg.CROP.promo-xlarge2.jpg',
		'sprints': [],
		'stories': [],
		'commits':[4,7,2,8,9],
		'gCommits':[18,15,6,9,11,13],
		'color':'#'+Math.floor(Math.random()*16777215).toString(16)
	}
	]
};

export default initialData;
