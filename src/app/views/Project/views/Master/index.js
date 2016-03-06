import React from 'react';
import TopNav from '../../../../shared/components/TopNav';
import ProjectListContainer from './components/ProjectList';

/* Master for all user projects */
export default (props) => {
	return (
		<div id="content">
			<TopNav view="Projects" />
			<ProjectListContainer />
		</div>
	);
};