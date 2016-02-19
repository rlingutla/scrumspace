import React from 'react';
import ProjectProgressBar from './projectProgressBar';

const ProjectBoard = (props) => {
	return (
		<div className="content">
			<div className="project-info container-fluid">
				<ProjectProgressBar />
			</div>
		</div>
	);
};

export default ProjectBoard;