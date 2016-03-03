import React from 'react';
import { render } from 'react-dom';

// Import modules used for client-side routing and route definition
import { Router, match, browserHistory } from 'react-router';
import routes from '../app/config/routes';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import scrumApp from '../app/reducers';

import { initialStateTree } from '../app/mock_server/server';

/* 	
	This is the 'entry point' into the client side code.
	We render our application using react-router by passing it in routes
*/
var mountNode = document.getElementById('app');


initialStateTree(0, function(stateTree){
	match({ history: browserHistory, routes }, (error, redirectLocation, renderProps) => {
		let store = createStore(scrumApp, stateTree);

		render(
		  <Provider store={store}>
		    <Router {...renderProps} store={{}}/>
		  </Provider>,
		  mountNode
		);
	});
});

