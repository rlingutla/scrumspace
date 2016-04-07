export default {
  '$schema': 'http://json-schema.org/draft-04/schema#',
  'type': 'object',
  'properties': {
    '_id': {
      'type': 'integer'
    },
    'first_name': {
      'type': 'string'
    },
    'last_name': {
      'type': 'string'
    },
    'email': {
      'type': 'string'
    },
    'display_name': {
      'type': 'string'
    },
    'avatar_url': {
      'type': 'string'
    }
  },
  'additionalProperties': false,
  'required': [
    '_id',
    'first_name',
    'last_name',
    'email',
    'display_name',
    'avatar_url'
  ]
};
