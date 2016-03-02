import React from 'react';
import Sidebar from './components/sidebar';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import scrumApp from './reducers';

import { initialStateTree } from './mock_server/server';

/* FOR SERVER RENDERING
//get state injected by server
const initialState = window.__INITIAL_STATE__;
//create store with initial state
let store = createStore(scrumApp, initialState);
*/


let store = createStore(scrumApp, initialStateTree(0)); // 0 is the mock userId

const AppContainer = (props) => {
	return (
		<div>
			<Sidebar />
			{props.children}
		</div>
	)
}

const App = (props) => {
	return (
		<Provider store={store}>
			<AppContainer {...props} />
		</Provider>
	);
};


export default App;