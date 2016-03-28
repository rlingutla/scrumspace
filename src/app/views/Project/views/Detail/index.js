import React from 'react';
import Project from './components/Project';

export default (props) => {
	const contentStyle = { paddingTop: 0 };
	return (
		<div id="content" style={contentStyle}>
			<Project id={props.params.id}>
				{props.children}
			</Project>
		</div>
	);
};
