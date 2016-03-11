import React from 'react';
import ProjectProgressBar from './ProjectProgressBar';
import ScrumBoard from './ScrumBoard/ScrumBoard';

const BoardView = (props) => {
	return (
		<div className="content">
			<div className="project-info container-fluid">
				<ProjectProgressBar project_id={props._id} />
			</div>
			<ScrumBoard {...props} />
		</div>
	);
};

export default BoardView;
