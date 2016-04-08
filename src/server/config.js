/*eslint node: true */
'use strict';

import express from 'express';
import entry from './entry';
import morgan from 'morgan';

var app = express();
var bodyParser = require('body-parser');

module.exports = function (app, io) {
	// set node port
	app.set('port', process.env.PORT || 8080);

	//logger
	app.use(morgan('dev'));

	app.use(bodyParser.text());
	app.use(bodyParser.json());

	// serve static assets off of /static virtual path prefix
	app.use('/static', express.static(__dirname + '/../../dist'));

	app.use('/api', require('./api')(io));

	// This is the server entry point for the application.
	app.get("/*", entry);

};