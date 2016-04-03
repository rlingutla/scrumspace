'use-strict';

var express = require('express'),
	router = express.Router();

var StandardError = require('../shared/StandardError');
var search = require('../shared/search');

router.get('/', function (req, res) {
    res.send('user API handler');
});

router.get('/search', function(req,res){
	var searchResults = search(req.query.searchStr || '', 'users', req.query.key || null);
	if(searchResults.data){
		searchResults.data = searchResults.data.map((user) => {
			return {
				'_id': user._id,
				'first_name': user.first_name,
				'last_name': user.last_name,
				'email': user.email,
				'display_name': user.display_name,
				'avatar_url': user.avatar_url
			}
		});
	}
	return res.send(searchResults);
});

router.get('/:id', function(req,res){
	res.send({
		"_id": req.params.id,
		"name": "dylan"
	});
});

module.exports = router;
