export default {
  '$schema': 'http://json-schema.org/draft-04/schema#',
  'type': 'object',
  'properties': {
    'name': {
      'type': 'string'
    },
    'scrum_time': {
      'type': 'string'
    },
    'duration': {
      'type': 'integer'
    }
  },
  'additionalProperties': false,
  'required': [
    'name',
    'scrum_time',
    'duration'
  ]
};
