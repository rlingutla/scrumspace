export default {
  '$schema': 'http://json-schema.org/draft-04/schema#',
  'type': 'object',
  'properties': {
    '_id': {
      'type': 'integer'
    },
    'from_status': {
      'type': 'string'
    },
    'to_status': {
      'type': 'string'
    },
    'modified_time': {
      'type': 'integer'
    },
    'history_type': {
      'type': 'string'
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