const errorTypes = {
	INVALID_KEY: 'Supplied object key was invalid',
	INVALID_ARGUMENTS: "Arguments are either missing or incorrect",
	OBJECT_NOT_FOUND: 'Supplied object or collection referenced a nonexisting entity',
	IDK: 'We\'re not really sure what happened'
}

module.exports = function(args){
	return {
		status: args.status || 500, // http status code
		title: errorTypes[args.title] || errorTypes.IDK, // standard error type
		detail: args.detail || '', // explanation
		source: args.source || {} // an argument source for error
	}
}