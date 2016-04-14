/*eslint node: true */
'use strict';

import express from 'express';
import entry from './entry';
import morgan from 'morgan';

var app = express();
var bodyParser = require('body-parser');
var jwt = require('express-jwt');

import { loginAuth } from './api/shared/authentication';

module.exports = {};

module.exports.secret = 'howMuchWoodCouldAWoodchuckChuckIfAWoodchuckCouldChuckWood'; //env this

module.exports.config = function (app, io) {
	// set node port
	app.set('port', process.env.PORT || 8080);

	app.set('views', __dirname + './views');

	//logger
	app.use(morgan('dev'));

	app.use(bodyParser.text());
	app.use(bodyParser.json());

	// serve static assets off of /static virtual path prefix
	app.use('/static', express.static(__dirname + '/../../dist'));

	app.use('/api', [loginAuth, require('./api')(io)]);

	app.use('/login', require('./login')(module.exports.secret));

	// app.use(jwt({ secret: new Buffer(module.exports.secret, 'base64')}).unless({path: ['/login', '/static']}));

	// This is the server entry point for the application.
	app.get("/*", entry);

};