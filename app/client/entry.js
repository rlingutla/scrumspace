import React from 'react';
import { render } from 'react-dom';

/* Import modules used for client-side routing and route defintion */
import { Router, browserHistory } from 'react-router';
import routes from '../routes';

/* 	Here we render our application to the document. 
	We render a react-router that knows our application routes
*/
render((<Router history={browserHistory} routes={routes}/>)
	, document.getElementById('app'));