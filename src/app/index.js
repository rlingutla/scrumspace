import React from 'react';
import Sidebar from './components/sidebar';

const App = (props) => {
	return (
		<div>
			<Sidebar />
			{props.children}
		</div>
	);
};

export default App;