import React from 'react';
import Project from './components/Project';
import Container from './containers';

const ProjectDetail = (props) => {
	const contentStyle = { paddingTop: 0 };
	let navView = props.location.pathname.substr(props.location.pathname.lastIndexOf('/') + 1);
	return (
		<div id="content" style={contentStyle}>
			<Project {...props} view={navView}>
				{props.children}
			</Project>
		</div>
	);
};

export default Container(ProjectDetail);