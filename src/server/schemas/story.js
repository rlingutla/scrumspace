import task from './task';

export default {
	'$schema': 'http://json-schema.org/draft-04/schema#',
	'type': 'object',
	'properties': {
	    'story_id': {
	      'type': 'string'
	    },
	    'title': {
	      'type': 'string'
	    },
	    'description': {
	      'type': 'string'
	    },
	    'tasks': {
	      'types': 'array',
	      'items': task
	    }
    }
};