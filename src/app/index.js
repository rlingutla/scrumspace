import React from 'react';
import Sidebar from './components/sidebar';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import scrumApp from './reducers';

let store = createStore(scrumApp);

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