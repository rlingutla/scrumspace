import history from './history';
import taskStatusEnum from './enums/taskStatuses';

export default {
  '$schema': 'http://json-schema.org/draft-04/schema#',
  'type': 'object',
  'properties': {
    '_id': {
      'type': 'integer'
    },
    'status': {
      'type': taskStatusEnum
    },
    'blocked_by': {
      'type': 'array',
      'items': {
          'type': 'integer'
      },
      'uniqueItems': true
    },
    'description': {
      'type': 'string'
    },
    'assigned_to': {
      'type': 'array',
      'items': {
          'type': 'integer'
      },
      'uniqueItems': true
    },
    'history': {
      'types': 'array',
      'items': history
    }
  },
  'additionalProperties': false,
  'required': [
    'status',
    'description'
  ]
};