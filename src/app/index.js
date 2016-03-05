import React from 'react';
import Sidebar from './components/Sidebar';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import scrumApp from './reducers';

/* FOR SERVER RENDERING
//get state injected by server
const initialState = window.__INITIAL_STATE__;
//create store with initial state
let store = createStore(scrumApp, initialState);
*/


const AppContainer = (props) => {
	return (
		<div>
			<Sidebar />
			{props.children}
		</div>
	);
}

const App = (props) => {
	return (<div></div>); //TODO: Abhay fix plz
	// return (
	// 	<AppContainer {...props} />
	// );
};

export default App;