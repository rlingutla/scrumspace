export default {
  '$schema': 'http://json-schema.org/draft-04/schema#',
  'type': 'object',
  'properties': {
    '_id': {
      'type': 'integer'
    },
    'name': {
      'type': 'string'
    },
    'start_date': {
      'type': 'integer'
    },
    'duration': {
      'type': 'integer'
    }
  },
  'additionalProperties': false,
  'required': [
    '_id',
    'name',
    'last_name',
    'start_date',
    'duration'
  ]
};