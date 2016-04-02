/*eslint node: true */
'use strict';

import express from 'express';
import entry from './entry'

module.exports = function (app) {
	// set node port
	app.set('port', process.env.PORT || 8080);

	// serve static assets off of /static virtual path prefix
	app.use('/static', express.static(__dirname + '/../../dist'));

	app.use('/api', require('./api'));

	// This is the server entry point for the application.
	app.get("/*", entry);

};