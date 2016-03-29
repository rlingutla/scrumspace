import React from 'react';
import Project from './components/Project';

export default (props) => {
	const contentStyle = { paddingTop: 0 };
	let navView = props.location.pathname.substr(props.location.pathname.lastIndexOf('/') + 1);


	return (
		<div id="content" style={contentStyle}>
			<Project id={props.params.id} view={navView}>
				{props.children}
			</Project>
		</div>
	);
};
