'use-strict';
//Schemas
var SprintSchema = require('../../schemas/sprint');
var validate = require('express-jsonschema').validate;
//Database Functions
var database = require('../../database');
var readDocument = database.readDocument;
var writeDocument = database.writeDocument;
//Sprint Helper function
var sprintHelper = ('./sprintHelper');
var sprintMaker = sprintHelper.sprintMaker;
var sprintDeleter = sprintHelper.removeSprint;
//Router
var express = require('express'),
	router = express.Router();

router.get('/', function (req, res) {
    res.send('project API handler');
});

router.get('/:id', function(req,res){
	res.send({'_id': req.params.id});
});


router.use('/:project_id/story/:story_id', function(req,res){
	res.send({'params': req.params});
});


//Sprint Routes
router.put('/:projectid/sprint/:sprintid', validate({ body: SprintSchema }), function(req, res){
	//going to have to eventually add user tokens...
	var project = sprintMaker(req.params.project, req.body.name, req.body.duration, req.body.time, req.body._id);
	 // Send the update!
	res.send(project);
});

router.post('/:projectid/sprint', validate({ body: SprintSchema }), function(req, res){
	//going to have to eventually add user tokens...
	var project = sprintMaker(req.params.project, req.body.name, req.body.duration, req.body.time, null);
	res.status(201);
	res.set('Location', '/project/' + req.params.project + '/sprint/' + project.sprints[project.sprints.length-1]._id);
	 // Send the update!
	res.send(project);
});

router.delete('/:projectid/sprint/:sprintid', function(req, res){
	var project = sprintDeleter(req.parapms.projectid, req.params.sprintid);
	res.send(project);
});

module.exports = router;
