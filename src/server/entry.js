// This is the server entry point for the application.
import { renderToStaticMarkup } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import Layout from './Layout';
import React from 'react';
import routes from '../app/config/routes';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import scrumApp from '../app/reducers';

import initialStateTree from './initialStateTree';

const initialStore = createStore(
	scrumApp, 
	initialStateTree, 
	applyMiddleware(
		thunkMiddleware
	)
);

// We use react-router to render the correct html as a string based on request URL. 
// Note that req.url here should be the full URL path from
// the original request, including the query string.
export default (req, res) => {
	logger("stuff");
	// Note that req.url here should be the full URL path from
	// the original request, including the query string.
	match({ routes , location: req.url }, (error, redirectLocation, renderProps) => {
		if (error) {
		  res.status(500).send(error.message);
		} else if (redirectLocation) {
		  res.redirect(302, redirectLocation.pathname + redirectLocation.search);
		} else if (renderProps) {
		// You can also check renderProps.components or renderProps.routes for
		// your "not found" component or route respectively, and send a 404 as
		// below, if you're using a catch-all route.
		// We use react-router to render the correct html as a string based on request URL. 

			//disabled server-side rendering (for now)
			/* 
			<Provider store={initialStore}>
				<RouterContext  {...renderProps} />
			</Provider>
			*/
			res.status(200).send(Layout(renderToStaticMarkup(<div />)));
		} else {
			res.status(404).send('Not found');
		}
	});
};
