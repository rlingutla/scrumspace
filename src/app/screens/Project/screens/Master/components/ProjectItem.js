import React from 'react';

const ProjectItem = (props) => {
	return (
		<div className="project-item">
			<p>{JSON.stringify(props)}</p>
		</div>
	)
}

export default ProjectItem;