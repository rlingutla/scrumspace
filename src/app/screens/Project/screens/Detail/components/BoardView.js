import React from 'react';
import ProgressBar from './ProgressBar';
import { ScrumBoard } from './ScrumBoard';

const BoardView = (props) => {
	return (
		<div className="content">
			<div className="project-info container-fluid">
				<ProgressBar />
			</div>
			<ScrumBoard />
		</div>
	);
};

export default BoardView;