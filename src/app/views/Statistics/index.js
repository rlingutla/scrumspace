import React from 'react';
import TopNav from '../../shared/components/TopNav';
import GitList from './components/GitList';

/* Master for all user projects */
export default () => {
	return (
		<div id="content">
			<TopNav view="Git Statistics"/>
			<GitList />
		</div>
	);
};
