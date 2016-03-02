import React from 'react';
import { render } from 'react-dom';

// Import modules used for client-side routing and route definition
import { Router, match, browserHistory } from 'react-router';
import routes from '../app/config/routes';

/* 	
	This is the 'entry point' into the client side code.
	We render our application using react-router by passing it in routes
*/

var mountNode = document.getElementById('app');

match({ history: browserHistory, routes }, 
	(error, redirectLocation, renderProps) => {
  render(<Router {...renderProps} />, mountNode);
});