var StandardError = require('./StandardError');
var readDocument = require('../../database').readDocument;

/*
** str: search string
** collection: target collection to search in
** key (optional): key to search on
** limit (optional): number of results
*/
module.exports = function(str, collection, key = '_id', limit=15){
	let searchCollection = readDocument(collection);
	console.log("col", searchCollection);
	//if it's an object, map the values to an array
	if (_.isObject(searchCollection)) searchCollection = _.values(searchCollection);
	else if(!_.isArray(searchCollection)) return {
		error: StandardError({
			status: 404,
			title: 'OBJECT_NOT_FOUND',
			source: collection
		})
	};

	//strip some stuff from search
	const escapeRegExp = (str_unesc) => str_unesc.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '');
	let filtered = [];
	//precalculate the regex once (faster)
	let searchExpr = new RegExp(escapeRegExp(str).split('').join('\\w*').replace(/\W/, ''), 'i');
	//loop through collection, find matching elements
	searchCollection.forEach((obj) => {
		if(typeof obj[key] === undefined) {
			return {error: StandardError({
				status: 400,
				title: 'INVALID_KEY',
				detail: 'The supplied collection model does not contain the property provided to search on',
				source: key
			})};
		}
		if (escapeRegExp(obj[key]).match(searchExpr)) filtered.push(obj);
	});

	return {data: filtered.slice(0, limit)};
}
