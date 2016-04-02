'use-strict';
var SprintSchema = require('../../schemas/sprint');
var database = require('../../database');
var readDocument = database.readDocument;
var writeDocument = database.writeDocument;

var validate = require('express-jsonschema').validate;
var express = require('express'),
	router = express.Router();

router.get('/', function (req, res) {
    res.send('project API handler');
});

router.get('/:id', function(req,res){
	res.send({"_id": req.params.id});
});

router.use('/:project_id/story/:story_id', function(req,res){
	res.send({"params": req.params});
});

function sprintMaker(project, name, duration, time, sprint){
	//sprint is not passed through if it is a new sprint hence the type is undefined
	var projects = readDocument('projects');
	//The following is to get the value of the project and sprint to be added or edited.
	var project_i, sprint_i;
	for(let i = 0; i < projects.length; i++){
		if (projects[i]._id === project) {
			project_i = i;
			for(let j = 0; j < projects[i].sprints.length && typeof sprint !== 'undefined'; j++){
				if(projects[i].sprints[j]._id === sprint){
					sprint_i = j;
					break;
				}
			}
			break;
		}
	}
	if(typeof sprint === 'undefined')
		sprint_i = projects[project_i].sprints.length;
	////////////////////////////////////////////////////
	let newSprint ={
		'_id': sprint_i,
		'name': name,
		'start_date': null,
		'duration': duration,
		'scrum_time': time
	};
	projects[project_i].sprints[sprint_i] = newSprint;
	writeDocument('projects', projects[project_i]);
	console.log('DB Updated', projects[project_i]);
	return projects[project_i].sprints[sprint_i];
}

router.post('/:projectid/sprint', validate({ body: SprintSchema }), function(req, res){
	//going to have to eventually add user tokens...
	var sprint = sprintMaker(req.params.project, req.body.name, req.body.duration, req.body.time, null);
	res.status(201);
	res.set('Location', '/project/' + req.params.project + '/' + sprint._id);
	 // Send the update!
	res.send(sprint);
});
module.exports = router;
