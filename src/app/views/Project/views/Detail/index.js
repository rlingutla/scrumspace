import React from 'react';
import TopNav from '../../../../shared/components/TopNav';
import ProjectContainer from './components/Project';
import { Glyphicon, Button } from 'react-bootstrap';

export default (props) => {
	return (
		<div id="content">
			<TopNav view="Projects" {...props}> 
				<Button>Create Project <Glyphicon glyph="plus" /></Button>
			</TopNav>
			<ProjectContainer id={props.params.id} />
		</div>
	);
};