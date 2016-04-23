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
    // console.log('request = ' + req.body.githubOwner);
    // console.log('request2 = ' + req.body.githubRepo);

    console.log('hello 1');
    var github = new GitHubApi({
      // required
      version: '3.0.0',
  //     proxy: {
  //   host: 'http://127.0.0.1',
  //   port: '8084'
  // },
      // optional
      debug: true,
      protocol: 'https',
      host: 'api.github.com', // should be api.github.com for GitHub
      pathPrefix: '/',
      timeout: 500000,
      headers: {
        'user-agent': 'My-Cool-GitHub-App' // GitHub is happy with a unique user agent
      }
    });

    var count = 0;
    var ssProjects1 = function(db, callback) {
      var cursor =db.collection('projects').find( );
      cursor.each(function(err, doc) {
        if (doc !== null) {
          console.log('variable creation === '+ doc.githubOwner + ', ' + doc.githubRepo);

            callback(doc);


        } else {
        //  callback(doc);
        }
      });
    };

    ssProjects1(db, function(doc) {
     console.log('function call === '+ typeof(doc.githubOwner) + ', ' + typeof(doc.githubRepo));
     var gUser = doc.githubOwner;
     var gRepo= doc.githubRepo;
      github.repos.getStatsParticipation({

        // user: doc.githubOwner,
        // repo: doc.githubRepo
        user: gUser,
        repo: gRepo

      }, function(err, response) {
        console.log('err ==== ' + err);
        console.log('gUser ==== ' + gUser);
        console.log('gRepo ==== ' + gRepo);
        console.log('All Stats = '+ response.all);
        //database functions
        // var ssProjects = function(db, callback) {
        //   var cursor =db.collection('projects').find( );
        //   cursor.each(function(err, doc) {
        //     if (doc !== null) {
        //       console.log(doc.stats.allStats);
        //     } else {
        //       callback();
        //     }
        //   });
        // };
          var allArr = response.all.slice(Math.max(response.all.length - 10, 1));
          console.log('project title ==== ' + doc.title);
          db.collection('projects').update(
            {'title' : doc.title},
            {$set:{'stats.allStats': allArr }},{multi:true}
          );
    });
  });

    // ssProjects(db, function() {
    //   //db.close();
    // });


    // //var data
    // github.repos.getStatsParticipation({
    //   user: 'rjerue',
    //   repo: 'Anagram-Finder'
    // }, function(err, response) {
    //   console.log('hello 1.0');
    //   //database functions
    //   var ssProjects = function(db, callback) {
    //     var cursor =db.collection('projects').find( );
    //     cursor.each(function(err, doc) {
    //       if (doc !== null) {
    //         console.log(doc.githubOwner + ', ' + doc.githubRepo);
    //         //callback(doc);
    //
    //       } else {
    //         callback();
    //       }
    //     });
    //   };
    //   ssProjects(db, function(doc) {
    //     console.log(doc.githubOwner + ', ' + doc.githubRepo);
    //   });
    //   var allArr = response.all.slice(Math.max(response.all.length - 10, 1));
    //   db.collection('projects').update(
    //     {},
    //     {$set:{'stats.allStats': allArr }},{multi:true}
    //   );
    //
    //   res.send(response);
    //   console.log(response);
    // });
    console.log('hello 2.0');

   });
   return router;
 };
