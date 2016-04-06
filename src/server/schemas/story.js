import task from './task';

export default {
	'$schema': 'http://json-schema.org/draft-04/schema#',
	'type': 'object',
	'properties': {
	    '_id': {
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
    }, 
    'required': [
    'title',
    'description',
    'tasks'
  ]
};