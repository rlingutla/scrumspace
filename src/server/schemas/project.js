{
	'_id': 0,
	'title': 'Drumpf',
	'description': 'Make America Great Again',
	'users': [0],
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
	"stories": [{
	  "story_id": "DT-S0",
	  "title": "Buy Hats",
	  "description": "Design Hats \nOrder Hats\nSell Hats",
	  "sprint_id": 0,
	  "tasks": [
	    {
	      "_id": 3,
	      "status": "DONE",
	      "assigned_to": [],
	      "blocked_by": [],
	      "description": "Replace Donald\"s Toupee",
	      "history": {
	        "elements": [
	          {
	            "from_status": null,
	            "to_status": "UNASSIGNED",
	            "modified_time": 1,
	            "modified_user": 0
	          }
	        ]
	      }
	    }
	  ]
	}]

}


export default {
	'$schema': 'http://json-schema.org/draft-04/schema#',
	'type': 'object',
	'properties': {
	    '_id': {
	      'type': 'integer'
	    },
	    'title': {
	      'type': 'string'
	    },
	    'description': {
	      'type': 'string'
	    },
	    'users': {
	      'types': 'array',
	      'items': 'integer'
	    },
	    'status': {
	    	'type'
	    }
    }
};