import React from 'react';
import TopNav from '../../../../shared/components/TopNav';
import Project from './components/Project';
import { Glyphicon, Button } from 'react-bootstrap';

export default (props) => {
	const contentStyle = { paddingTop: 0 }

	return (
		<div id="content" style={contentStyle}>
			<Project id={props.params.id} />
		</div>
	);
};
