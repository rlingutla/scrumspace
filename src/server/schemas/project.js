import story from './story';
import sprint from './sprint';

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
	    	'type': ['SPRINT', 'PLANNING', 'REVIEW']
	    },
	    'sprints': {
	   		'types': 'array',
	    	'items': sprint
	    },
	    'stories': {
	    	'types': 'array',
	    	'items': story
	    }
    }
};