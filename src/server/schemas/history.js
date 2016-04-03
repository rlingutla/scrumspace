import taskStatusesEnum from './enums/taskStatuses';

export default {
  '$schema': 'http://json-schema.org/draft-04/schema#',
  'type': 'object',
  'properties': {
    '_id': {
      'type': 'integer'
    },
    'from_status': {
      'type': taskStatusesEnum
    },
    'to_status': {
      'type': taskStatusesEnum
    },
    'modified_time': {
      'type': 'integer'
    },
    'history_type': {
      'type': ['CREATED', 'MOVED', 'TAKEN', 'COMPLETED']
    }
  },
  'additionalProperties': false,
  'required': [
    '_id',
    'from_status',
    'to_status',
    'modified_time',
    'history_type'
  ]
};