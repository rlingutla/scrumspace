/*eslint node: true */
'use strict';

var express = require('express');

module.exports = function(app){
	/* set node port */
	app.set('port', process.env.PORT || 3000);

	/* serve static assets off of /static virtual path prefix */
	app.use('/static', express.static(__dirname + '/../dist'));

	/* return special contents for index.html */
	app.get('*', (req, res) => {
		res.sendFile(__dirname + "/../dist/index.html",  {'root': '/'});
	});
};