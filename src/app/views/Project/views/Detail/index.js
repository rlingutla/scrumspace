import React from 'react';
import TopNav from '../../../../shared/components/TopNav';
import Project from './components/Project';
import { Glyphicon, Button } from 'react-bootstrap';

export default (props) => {
	return (
		<div id="content">
			<TopNav view="Project" {...props} />
			<Project id={props.params.id} />
		</div>
	);
};
