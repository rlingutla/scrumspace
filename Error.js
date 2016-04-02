const errorTypes = {
	'KEY_NOT_FOUND': 'Supplied object key was not found',
	'INVALID_OBJECT': 'Supplied object was invalid',
	'ENTITY_NOT_FOUND': 'Supplied ID did not reference an existing entity',
	'IDK': 'We\'re not really sure what happened'
};

module.exports = function(args){
	return {
		status: '',
		reason: '',
		title: '',
		detail: '',
		source: {}
	}
}