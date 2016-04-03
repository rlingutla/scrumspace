'use-strict';
//Schemas
var SprintSchema = require('../../schemas/sprint');
var validate = require('express-jsonschema').validate;
//Database Functions
var database = require('../../database');
var readDocument = database.readDocument;
var writeDocument = database.writeDocument;
//Sprint Helper function
var sprintHelper = require('./sprintHelper');
var sprintMaker = sprintHelper.sprintMaker;
var removeSprint = sprintHelper.removeSprint;
//Router
var express = require('express'),
	router = express.Router();

router.get('/', function (req, res) {
    res.send('project API handler');
});

router.get('/:id', function(req,res){
	res.send({'_id': req.params.id});
});


router.put('/:project_id/story/:story_id', function (req, res) {
	var projectId = parseInt(req.params.project_id, 10);

	var sprintId = parseInt(req.body.sprintId, 10);
	var projects = readDocument('projects');
	var project_i, story_i;
	
	for(let i = 0; i < projects.length; i++){
		if (projects[i]._id === projectId) {
			project_i = i;
			for(let j = 0; j < projects[i].stories.length; j++){
				if(projects[i].stories[j]._id === req.params.story_id) {
					story_i = j;
					break;
				}
			}
		}
	}

	if (projects[project_i].stories[story_i] !== null) {
		projects[project_i].stories[story_i].sprint_id = sprintId;
		writeDocument('projects', projects[project_i]);
		res.send(projects[project_i]);
	} else {
		// TODO BETTER
		res.status(400);
		res.send({});
	}

});

//Sprint Routes
router.put('/:projectid/sprint/:sprintid', validate({ body: SprintSchema }), function(req, res){
	//going to have to eventually add user tokens...
	var project = sprintMaker(parseInt(req.params.project, 10), req.body.name, req.body.duration, req.body.time, parseInt(req.body._id, 10));
	 // Send the update!
	res.send(project);
});

router.post('/:projectid/sprint', validate({ body: SprintSchema }), function(req, res){
	//going to have to eventually add user tokens...
	var project = sprintMaker(parseInt(req.params.projectid, 10), req.body.name, parseInt(req.body.duration, 10), req.body.scrum_time);
	res.status(201);
	res.set('Location', '/project/' + req.params.projectid + '/sprint/' + project.sprints[project.sprints.length-1]._id);
	 // Send the update!
	res.send(project);
});
//parseInt(userid, 10)
router.delete('/:projectid/sprint/:sprintid', function(req, res){
	var project = removeSprint(parseInt(req.params.projectid, 10), parseInt(req.params.sprintid, 10));
	res.send(project);
});

module.exports = router;
