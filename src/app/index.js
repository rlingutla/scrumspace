import React from 'react';
import Sidebar from './components/Sidebar';
import TopNav from './shared/components/TopNav';
import Container from './containers/';
import ErrorBanner from './shared/components/ErrorBanner';

const App = (props) => {

	return (
		 <div className="app_loading">
		 	<ErrorBanner />
			<Sidebar />
			{(props.loading) ? <TopNav/>:  props.children}
		</div>
	);
};

export default Container(App);
