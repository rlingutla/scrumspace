import React from 'react';

const ProjectProgressBar = (props) => {
	return (
		<div>
			<div className="row left-right-align progress-bar-details">
			    <div className="col-md-6"><strong>1/7</strong> Tasks Complete</div>
			    <div className="col-md-6"><strong>5</strong> Days Left of Sprint</div>
			</div>
			<div className="progress">
			    <div className="progress-bar progress-bar-warning" style={{width: '28%'}}></div>
			    <div className="progress-bar progress-bar-danger" style={{width: '14%'}}></div>
			    <div className="progress-bar progress-bar-success" style={{width: '14%'}}></div>
			</div>
		</div>
	);
};

export default ProjectProgressBar;