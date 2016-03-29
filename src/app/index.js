import React from 'react';
import Sidebar from './components/Sidebar';
import TopNav from './shared/components/TopNav';
import Container from './containers/';

const App = (props) => {
	return (
		 <div className="app_loading">
			<Sidebar />
			{(props.loading) ? <TopNav/>:  props.children}
		</div>
	);
};

export default Container(App);
