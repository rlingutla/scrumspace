'use-strict';

var express = require('express'),
	router = express.Router();

router.get('/', function (req, res) {
    res.send('user API handler');
});

router.get('/:id', function(req,res){
	res.send({
		"_id": req.params.id,
		"name": "dylan"
	});
});

module.exports = router;
