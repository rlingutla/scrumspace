/*eslint node: true */
'use strict';

import express from 'express';
import routes from '../app/config/routes';

import { renderToString } from 'react-dom/server';
import { createRoutes, match, RouterContext, Router } from 'react-router';
import React from 'react';

module.exports = function (app) {
	/* set node port */
	app.set('port', process.env.PORT || 8080);

	/* serve static assets off of /static virtual path prefix */
	app.use('/static', express.static(__dirname + '/../../dist'));

	// Ship out this to client!
	app.get("/*", (req, res) => {
	  // Note that req.url here should be the full URL path from
	  // the original request, including the query string.
	  match({ routes , location: req.url }, (error, redirectLocation, renderProps) => {
	    if (error) {
	      res.status(500).send(error.message)
	    } else if (redirectLocation) {
	      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
	    } else if (renderProps) {
	      // You can also check renderProps.components or renderProps.routes for
	      // your "not found" component or route respectively, and send a 404 as
	      // below, if you're using a catch-all route.
	      res.status(200).send(renderToString(<RouterContext  {...renderProps} />))
	    } else {
	      res.status(404).send('Not found')
	    }
	  })
	})

};