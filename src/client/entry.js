import React from 'react';
import { render } from 'react-dom';

/* Import modules used for client-side routing and route defintion */
import { Router, match, history } from 'react-router';
import routes from '../app/config/routes';

/* 	
	Here we render our application to the document. 
	We render by using react-router, which knows our application routes
*/

var mountNode = document.getElementById('app');

match({ history, routes }, (error, redirectLocation, renderProps) => {
  render(<Router {...renderProps} />, mountNode);
});