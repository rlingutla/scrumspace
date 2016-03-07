import React from 'react';
import ProgressBarContainer from './ProgressBar';
import ScrumBoard from './ScrumBoard/ScrumBoard';

const BoardView = (props) => {
	return (
		<div className="content">
			<div className="project-info container-fluid">
				<ProgressBarContainer project_id={props._id} />
			</div>
			<ScrumBoard {...props} />
		</div>
	);
};

export default BoardView;