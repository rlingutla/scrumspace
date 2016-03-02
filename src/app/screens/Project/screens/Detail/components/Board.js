import React from 'react';
import ProgressBar from './ProgressBar';

const Board = (props) => {
	return (
		<div className="content">
			<div className="project-info container-fluid">
				<ProgressBar />
			</div>
		</div>
	);
};

export default Board;