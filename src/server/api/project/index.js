'use-strict';
var bodyParser = require('body-parser');
var validate = require('express-jsonschema').validate;
var express = require('express'),
	router = express.Router();

router.use(bodyParser.text());
router.use(bodyParser.json());
router.get('/', function (req, res) {
    res.send('project API handler');
});

router.get('/:id', function(req,res){
	res.send({"_id": req.params.id});
});

router.use('/:project_id/story/:story_id', function(req,res){
	res.send({"params": req.params});
});

module.exports = router;
