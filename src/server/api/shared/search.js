'use strict';

var StandardError = require('./StandardError');
var _ = require('underscore');

/*
** str: search string
** collection: target collection to search in
** key (optional): key to search on
** limit (optional): number of results
*/
module.exports = function(db, str, collection, key = '_id', limit=15){
	return new Promise((resolve, reject) => {
		db.collection(collection).find({ [key]: { $regex: new RegExp(str), $options: 'i' } }, { password: 0 }, { limit }).toArray((err, results) => {
			if(err) reject({ error: StandardError({
				status: 404,
				title: 'OBJECT_NOT_FOUND',
				source: collection
			})});
			else resolve({data: results});
		});
	});
};
