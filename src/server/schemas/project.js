import story from './story';
import sprint from './sprint';

export default {
	'$schema': 'http://json-schema.org/draft-04/schema#',
	'type': 'object',
	'properties': {
	    'title': {
	      'type': 'string'
	    },
	    'description': {
	      'type': 'string'
	    },
	    'users': {
	      'types': 'array',
	      'items': 'integer'
	    }
    }
};
