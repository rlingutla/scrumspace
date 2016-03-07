import React from 'react';
import TopNav from '../../../../shared/components/TopNav';
import ProjectListContainer from './components/ProjectList';
import { Button, Glyphicon } from 'react-bootstrap';

/* Master for all user projects */
export default (props) => {
	return (
		<div id="content">
			<TopNav view="Projects">
				<Button>Create Project <Glyphicon glyph="plus" /></Button>
			</TopNav>
			<ProjectListContainer />
		</div>
	);
};