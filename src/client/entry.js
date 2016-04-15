import React from 'react';
import { render } from 'react-dom';

// Import modules used for client-side routing and route definition
import { Router, match, browserHistory } from 'react-router';
import routes from '../app/config/routes';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import scrumApp from '../app/reducers';
import { Login } from '../app/components/Authentication';

import { stateTree } from '../app/server_calls/index';
import { getUser } from '../app/shared/utils/utils';

// socket stuff
import initSocket, {chatMiddleware} from '../app/config/socketMiddleware';

/*
	This is the 'entry point' into the client side code.
	We render our application using react-router by passing it in routes
*/

var mountNode = document.getElementById('app');

const renderLogin = () => {
	render(<Login renderScrumspace={renderClient}/>, mountNode);
};

const renderClient = () => {
	stateTree(getUser()).then((stateTree) => {
		match({ history: browserHistory, routes }, (error, redirectLocation, renderProps) => {
			let store = createStore(
				scrumApp,
				stateTree,
				applyMiddleware(
					thunkMiddleware
				)
			);

			initSocket(store);

			render(
			  <Provider store={store}>
			    <Router {...renderProps} store={{}}/>
			  </Provider>,
			  mountNode
			);
		});
	});
};

// get auth token
if(localStorage.scrumToken){
	renderClient();
}
// not authenticated
else renderLogin();