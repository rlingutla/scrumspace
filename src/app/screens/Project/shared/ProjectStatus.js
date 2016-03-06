import React from 'react';

const ProjectStatus = (props) => {
	return (
		<div className={'project-status ' + props.status}>
			{props.status}
		</div>
	);
};

export default ProjectStatus;