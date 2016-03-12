import React from 'react';
import ProjectProgressBar from './ProjectProgressBar';
import ScrumBoard from './ScrumBoard/ScrumBoard';

const BoardView = (props) => {
	if(props.current_sprint != null)
		return (
			<div className="content">
				<div className="project-info container-fluid">
					<ProjectProgressBar project_id={props._id} />
				</div>
				<ScrumBoard {...props} />
			</div>
		);
	else 
		return (
			<div className="content">
				<div className="project-info container-fluid">
					<h1>Go plan a sprint!</h1>
				</div>
			</div>
		)
};

export default BoardView;
