'use-strict';
import UserSchema from '../../schemas/user';
var validate = require('express-jsonschema').validate;

var database = require('../../database');
var readDocument = database.readDocument;
var writeDocument = database.writeDocument;
var getCollection = database.writeDocument;

var authentication = require('../shared/authentication');
var getUserIdFromToken = authentication.getUserIdFromToken;
var checkAuthFromProject = authentication.checkAuthFromProject;

var express = require('express'),
router = express.Router();
module.exports = router;

var StandardError = require('../shared/StandardError');
var search = require('../shared/search');
var GitHubApi = require('github');

var MongoDB = require('mongodb');
var ObjectID = MongoDB.ObjectID;

module.exports = function (io, db) {

  router.get('/gitStats', function(req, res) {

    console.log('hello 1');
    var github = new GitHubApi({
      // required
      version: '3.0.0',
      debug: true,
      protocol: 'https',
      host: 'api.github.com',
      pathPrefix: '/',
      timeout: 500000,
      headers: {
        'user-agent': 'My-Cool-GitHub-App'
      }
    });

   //find all the projects in the database
    var ssProjects = function(db, callback) {
      var cursor =db.collection('projects').find( );
      //for each project, call the callback on it
      cursor.each(function(err, doc) {
        if (doc !== null) {
            callback(doc);
        } else {
          //callback(doc);
        }
      });
    };


    //for the project passed in, grab the appropriate git owner and repo names
    //use them to grab data from the github api and then update them in the
    //project database
    //only store data from the last 10 weeks.
    ssProjects(db, function(doc) {
     var gUser = doc.githubOwner;
     var gRepo= doc.githubRepo;
      github.repos.getStatsParticipation({

        user: gUser,
        repo: gRepo

      }, function(err, response) {
          var allArr = response.all.slice(Math.max(response.all.length - 10, 1));
          db.collection('projects').update(
            {'title' : doc.title},
            {$set:{'stats.allStats': allArr }},{multi:true}
          );
    });
  });


   });
   return router;
 };
