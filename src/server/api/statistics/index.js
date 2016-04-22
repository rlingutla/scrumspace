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

var StandardError = require('../shared/StandardError');
var search = require('../shared/search');
var GitHubApi = require('github');

module.exports = function (io, db) {

  router.get('/gitStats', function(req, res) {
    console.log('request = ' + req);


    var github = new GitHubApi({
      // required
      version: '3.0.0',
      // optional
      debug: true,
      protocol: 'https',
      host: 'api.github.com', // should be api.github.com for GitHub
      pathPrefix: '/', // for some GHEs; none for GitHub
      timeout: 5000,
      headers: {
        'user-agent': 'My-Cool-GitHub-App' // GitHub is happy with a unique user agent
      }
    });

    //var data =
    github.repos.getStatsParticipation({
      // optional:
      // headers: {
      //     "cookie": "blahblah"
      // },
      user: 'rlingutla',
      repo: 'ForestTycoon-HampHack-2016-'
    }, function(err, response) {
      console.log('hello 1.0');
      res.send(response);
      console.log(response);
      //return JSON.stringify(res);
    });
    console.log('hello 2.0');
    //	console.log(data);
    //	return res.send('hello');

  });
  return router;
};
